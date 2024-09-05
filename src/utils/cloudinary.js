import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadCloudinary = async (localPath) => {
    try{
        if(!localPath) return null
        const response = await cloudinary.uploader.upload(localPath, {
            resource_type: "auto"
        })
        console.log("File uploaded successfully ",response.url)
        return response
    } catch(error){
        fs.unlinkSync(localPath)
        return null
    }
}