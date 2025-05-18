import { Popover } from "@mui/material";
import BaseImagePicker from "./BaseImagePicker";

const ContentImagePicker = ({ anchorEl, onClose, editor }) => {
  const handleImageSelect = (url) => {
    if (editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
    onClose();
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

export default ContentImagePicker;
