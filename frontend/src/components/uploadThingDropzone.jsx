// components/ImageUpload.jsx
import React from "react";
import { uploadImageToUploadThing } from "../../utils/uploadImageToUploadThing";

const MAX_SIZE_MB = 5;

const ImageUpload = ({ onComplete }) => {
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);

    // Only images, max 5MB
    const validFiles = files.filter((file) => {
      const isImage = file.type.startsWith("image/");
      const isUnder5MB = file.size / (1024 * 1024) <= MAX_SIZE_MB;
      return isImage && isUnder5MB;
    });

    if (validFiles.length === 0) {
      alert("Only image files under 5MB are allowed.");
      return;
    }

    try {
      const urls = await uploadImageToUploadThing(validFiles);
      console.log("Uploaded URLs:", urls);
      onComplete?.(urls);
    } catch (err) {
      alert("Failed to upload image");
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
};

export default ImageUpload;
