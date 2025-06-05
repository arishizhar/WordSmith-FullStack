import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography } from "@mui/material";

const MAX_SIZE_MB = 5;

const CloudinaryDropzone = ({ onComplete }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      if (
        !file.type.startsWith("image/") ||
        file.size > MAX_SIZE_MB * 1024 * 1024
      ) {
        alert("Only image files under 5MB are allowed.");
        return;
      }

      setPreviewUrl(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "wordsmith"); // your Cloudinary preset

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dethtfzxg/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const text = await res.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          console.error("Failed to parse response JSON. Raw text:", text);
          alert("Upload failed: invalid response");
          return;
        }

        console.log("Cloudinary Response:", data);

        if (data.secure_url) {
          onComplete?.(data.secure_url);
        } else {
          alert("Upload failed: " + (data.error?.message || "Unknown error"));
        }
      } catch (err) {
        console.error("Upload failed with error:", err);
        alert("Upload failed (check console for details)");
      }
    },
    [onComplete]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [] },
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: "2px dashed #aaa",
        padding: "1rem",
        textAlign: "center",
        cursor: "pointer",
        bgcolor: isDragActive ? "#f0f0f0" : "inherit",
        gridColumn: "span 4",
      }}
    >
      <input {...getInputProps()} />
      <Typography>
        {isDragActive
          ? "Drop the image here..."
          : "Click or drag an image to upload"}
      </Typography>
      {previewUrl && (
        <Box mt={2}>
          <img
            src={previewUrl}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 4 }}
          />
        </Box>
      )}
    </Box>
  );
};

export default CloudinaryDropzone;
