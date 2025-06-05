import React from "react";

const CloudinaryImageUpload = ({ onComplete }) => {
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "wordsmith"); // 👈 Your Cloudinary preset

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dethtfzxg/image/upload", // 👈 Your cloud name
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.secure_url) {
        console.log("Uploaded to:", data.secure_url);
        onComplete?.(data.secure_url); // Send back the image URL
      } else {
        console.error("Upload error:", data);
        alert("Upload failed");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed");
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
};

export default CloudinaryImageUpload;
