// utils/uploadImageToUploadThing.js
import { uploadFiles } from "uploadthing/client";

export const uploadImageToUploadThing = async (files) => {
  try {
    const response = await uploadFiles("imageUploader", { files });
    const urls = response.map((file) => file.url);
    return urls;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};
