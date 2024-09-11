import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'


cloudinary.config({ 
    cloud_name: 'deqewgc25', 
    api_key: '665387174154743', 
    api_secret: '92c6FqiAPEelQs7VmLfX0i_BpAg'
})

export const uploadCloudinary = async (localPath) => {
    try{
        if(!localPath) return null
        const response = await cloudinary.uploader.upload(localPath, {
            resource_type: "auto"
        })
        fs.unlinkSync(localPath)
        return response
    } catch(error){
        console.log(error)
        fs.unlinkSync(localPath)
        return null
    }
}