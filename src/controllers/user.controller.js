import {asyncHandler} from '../utils/asyncHandler.js'
import {apiError} from '../utils/apiError.js'
import { User } from '../models/user.model.js';
import { uploadCloudinary } from '../utils/cloudinary.js'
import { apiResponse } from '../utils/apiResponse.js'
import jwt from 'jsonwebtoken'

const generateAccessAndRefreshTokens = async(userId) => {
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken,refreshToken}
    }catch(error){
        throw new apiError(500,"Something went wrong , while generating token")
    }
}

export const registerUser = asyncHandler(async (req,res) => {
    const {username , email, fullName, password} = req.body;

    if(
        [fullName,username,email,password].some((field) => field?.trim() === "")
    ){
        throw new apiError(400, "All field is required")
    }

    const existedUser = await User.findOne({
        $or: [{username},{email}]
    })
    if(existedUser){
        throw new apiError(409, "User with email or username already exist")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    let coverImageLocalPath;

    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0]?.path
    } 

    if(!avatarLocalPath){
        throw new apiError(400, "Avatar file is required")
    }

    const avatar = await uploadCloudinary(avatarLocalPath)
    const coverImage = await uploadCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new apiError(400, "Avatar file is required !!")
    }

    const user = await User.create({
        username,
        email,
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new apiError(500, "Internal server error , while registering the user")
    }

    return res.status(201).json(
        new apiResponse(200, createdUser, "User registered successfully")
    )
})

export const loginUser = asyncHandler(async (req,res) => {
    const {username , password} = req.body;
    if(!username){
        throw new apiError(400,"Username is required")
    }

    const user = await User.findOne({username})
    if(!user){
        throw new apiError(404,"User does not exist");
    }

    const isValid = await user.isPasswordCorrect(password)
    if(!isValid){
        throw new apiError(401,"Password Incorrect")
    }

    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id)
    const loggedInUser = await User.findById(user._id).
    select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new apiResponse(
            200,
            {
                user : loggedInUser, refreshToken, accessToken
            },
            "User logged in successfully"
        )
    )
})

export const logoutUser = asyncHandler(async(req,res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken: undefined
            }
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new apiResponse(200,{},"User logged out successfully"))
}) 

export const refreshAccessToken = asyncHandler(async (req,res) => {
    const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken
    if(!incomingRefreshToken){
        throw new apiError(401,"Unauthorized request")
    }
    
    const decodedRefreshToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
    const user = await User.findById(decodedRefreshToken?._id)
    if(!user){
        throw new apiError(401,"Invalid refresh token")
    }

    if(incomingRefreshToken !== user?.refreshToken){
        throw new apiError(401,"Refresh token is expired")
    }

    const options = {
        httpOnly: true,
        secure: true
    }
    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id)
    return res
    .status(200)
    .cookie("accessToken",accessToken)
    .cookie("refreshToken",refreshToken)
    .json(
        new apiResponse(200,{accessToken,refreshToken},"Access token refreshed successfully")
    )
})

export const changeCurrentPassword = asyncHandler(async (req,res) => {
    const {oldPassword,newPassword} = req.body
    const userId = req.user?._id
    const user = await User.findById(userId)

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    if(!isPasswordCorrect){
        throw new apiError(400,"Invalid Old Password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new apiResponse(200,{},"Password changed successfully"))
})

export const getCurrentUser = asyncHandler(async(req,res) => {
    return res
    .status(200)
    .json(200,req.user,"Current User fetched successfully")
})
