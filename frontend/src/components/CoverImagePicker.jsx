import { useState, useRef, useEffect } from "react";
import { Popover } from "@mui/material";
import BaseImagePicker from "./BaseImagePicker";

const CoverImagePicker = ({ anchorEl, onClose, setCoverImage }) => {
  const handleImageSelect = (url) => {
    setCoverImage(url);
    onClose(); // closes the popover
  };

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <BaseImagePicker onSelectImage={handleImageSelect} onClose={onClose} />
    </Popover>
  );
};

export default CoverImagePicker;
