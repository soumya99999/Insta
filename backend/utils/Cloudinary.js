import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

try {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET_KEY,
    });
    console.log("Cloudinary configuration complete!");
} catch (error) {
    console.error("Error configuring Cloudinary:", error);
}


export default cloudinary;