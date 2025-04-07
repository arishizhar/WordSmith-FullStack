import { TextField } from "@mui/material";
import {
  EditorProvider,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const extensions = [StarterKit];
const content = "<p>Hello World!</p>";

const Tiptap = () => {
  return (
    <>
      <TextField
        variant="standard"
        placeholder="Title"
        fullWidth
        InputProps={{
          disableUnderline: true,
          sx: {
            fontSize: "2.5rem", // Adjust for how large you want
            fontWeight: "bold",
            marginBottom: "1rem",
          },
        }}
      />
      <EditorProvider extensions={extensions} content={content}>
        <EditorContent />
        <FloatingMenu>This is the floating menu</FloatingMenu>
        <BubbleMenu>This is the bubble menu</BubbleMenu>
      </EditorProvider>
    </>
  );
};

export default Tiptap;
