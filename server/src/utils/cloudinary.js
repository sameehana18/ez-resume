import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadAvatarToCloudinary = async (localPathFile) => {
    try {
        if (!localPathFile) return null;

        const result = await cloudinary.uploader.upload(localPathFile, {
            folder: `${process.env.CLOUDINARY_AVATAR_FOLDER_NAME}`,
            resource_type: "auto"
        });

        fs.unlink(localPathFile, (err) => {
            if (err) {
                console.log("Error deleting file:", err);
            }
        });

        return result;

    } catch (error) {

        console.error("Error uploading to Cloudinary:", error);

        
        fs.unlink(localPathFile, (err) => {
            if (err) {
                console.log("Error deleting file:", err);
            }
        });

        return null;
    }
};

const deleteAvatarFromCloudinary = async (publicId) => {
    if (!publicId) {
      console.log('No public_id found for avatar, skipping deletion.');
      return;
    }
  
    try {
      const result = await cloudinary.v2.uploader.destroy(publicId);
      console.log('Cloudinary deletion result:', result);
    } catch (error) {
      console.error('Error deleting from Cloudinary', error);
      throw new Error('Error deleting from Cloudinary');
    }
  };
  

export { uploadAvatarToCloudinary, deleteAvatarFromCloudinary };
