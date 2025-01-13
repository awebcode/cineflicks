"use server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(file: File, type: "photo" | "video") {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const base64Data = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${base64Data}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: type === "photo" ? "image" : "video",
      folder: type === "photo" ? "partner_photos" : "partner_videos",
    });

    return result.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Failed to upload file");
  }
}


export const deleteFromCloudinary = async (url: string) => {
  try {
    await cloudinary.uploader.destroy(url);
    console.log("Deleted from Cloudinary:", url);
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
  }
};