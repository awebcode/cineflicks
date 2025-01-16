"use server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(file: File, type: "photo" | "video") {
  const chunkSize = 4.5 * 1024 * 1024; // 4.5MB
  const fileSize = file.size;
  let offset = 0;
  let uploadResult: any = null;

  try {
    while (offset < fileSize) {
      console.log({ offset, fileSize });
      const chunk = file.slice(offset, offset + chunkSize);
      const arrayBuffer = await chunk.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Data = buffer.toString("base64");
      const dataURI = `data:${file.type};base64,${base64Data}`;

      uploadResult = await cloudinary.uploader.upload(dataURI, {
        resource_type: "auto",
        folder: type === "photo" ? "partner_photos" : "partner_videos",
        public_id: uploadResult?.public_id || `${file.name}_${Date.now()}`,
        eager: [{ quality: "auto", fetch_format: "auto" }],
        ...(uploadResult && { overwrite: true }), // Ensures continuation for subsequent chunks
      });

      offset += chunkSize;
    }

    return uploadResult?.secure_url || "";
  } catch (error: any) {
    console.error("Error uploading to Cloudinary:", error.message || error);
    throw new Error("Failed to upload file.");
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
