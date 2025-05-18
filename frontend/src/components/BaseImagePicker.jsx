import { useState } from "react";
import { Box, Tabs, Tab, TextField, Button, Typography } from "@mui/material";
import UploadImageTab from "./UploadImageTab"; // the Dropzone part

const BaseImagePicker = ({ onSelectImage, onClose }) => {
  const [tab, setTab] = useState(0);
  const [imageUrlInput, setImageUrlInput] = useState("");

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleUrlSubmit = () => {
    if (imageUrlInput.trim()) {
      onSelectImage(imageUrlInput.trim());
      setImageUrlInput("");
      onClose();
    }
  };

  const handleUnsplashSelect = () => {
    const randomUrl = "https://source.unsplash.com/random/800x600";
    onSelectImage(randomUrl);
    onClose();
  };

  return (
    <Box sx={{ width: 300, p: 2 }}>
      <Tabs value={tab} onChange={handleTabChange} variant="fullWidth" centered>
        <Tab label="Upload" />
        <Tab label="Image URL" />
        <Tab label="Unsplash" />
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {tab === 0 && (
          <UploadImageTab
            onImageSelected={(url) => {
              onSelectImage(url);
              onClose();
            }}
          />
        )}

        {tab === 1 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <TextField
              label="Image URL"
              value={imageUrlInput}
              onChange={(e) => setImageUrlInput(e.target.value)}
              fullWidth
            />
            <Button onClick={handleUrlSubmit} variant="contained">
              Submit
            </Button>
          </Box>
        )}

        {tab === 2 && (
          <div>
            {" "}
            {/* Unsplash search tab, to be built later */} Coming Soon{" "}
          </div>
        )}
      </Box>
    </Box>
  );
};

export default BaseImagePicker;
