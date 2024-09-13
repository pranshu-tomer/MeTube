import { Video } from "../models/video.model.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js"

export const uploadVideo = asyncHandler(async(req,res) => {
    const {title , description} = req.body;
    if(!title && !description){
        throw new apiError(401,"All the fields are required")
    }

    const videoFilePath = req.files?.videoFile[0]?.path
    const thumbnailPath = req.files?.thumbnail[0]?.path

    const videoFileDetail = await uploadCloudinary(videoFilePath)
    const thumbnailDetail = await uploadCloudinary(thumbnailPath)
    
    if(!videoFileDetail){
        throw new apiError(500,"Problem in uploading the video")
    }

    const video = await Video.create({
        videoFile : videoFileDetail.url,
        thumbnail: thumbnailDetail.url,
        title,
        description,
        duration : videoFileDetail.duration,
        owner : req.user._id
    })

    return res.status(200).json(
        new apiResponse(200,"Video Uploaded Successfully")
    )
})