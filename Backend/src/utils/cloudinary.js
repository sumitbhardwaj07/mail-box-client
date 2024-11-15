import {v2 as cloudinary} from "cloudinary";

import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async(localFilePath) =>{
    if(!localFilePath) return {error: "File path not provided"};
    try {

        const response = await cloudinary.uploader.upload(localFilePath, {resource_type:"auto"})
        //console.log("file is uploaded on cloudinary", response.url)

        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        console.error("Cloudinary upload failed:", error);
        fs.unlinkSync(localFilePath)
        return { error: "Upload failed" };
    }
};

export default uploadOnCloudinary;