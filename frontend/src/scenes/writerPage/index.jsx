import { red } from "@mui/material/colors";
import Tiptap from "./TipTap";
import { Box, useTheme, TextField, Button } from "@mui/material";
import {useRef} from "react"

const WriterPage = () => {
  const theme = useTheme();
  const editorRef = useRef(null);

  const handlePublishSubmit = () => {
    const editor = editorRef.current;
    if(!editor) return;

    const content = editor.getJSON();
    console.log("submitted data", content);
  }

  return (
    <Box
      width="60%"
      p="1rem 6%"
      mx="auto"
    >
      <div
        style={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          padding: "1rem",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        {/* Top Row: Button on the right, empty space on the left */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box /> {/* Empty box to push button to the right */}
          <Button
            type="submit"
            onClick={handlePublishSubmit}
            sx={{
              mb: "0.5rem",
              p: "0.4rem 1rem",
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.background.alt,
              borderRadius: "5px", 
              "&:hover": {
                backgroundColor: "#66E5FA",
              },
            }}
          >
            Publish
          </Button>
        </Box>

        {/* Title Field */}
        <TextField
          variant="standard"
          placeholder="Title"
          fullWidth
          InputProps={{
            disableUnderline: true,
            sx: {
              fontSize: "3.2rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            },
          }}
        />

        <Tiptap editorRef={editorRef}/>
      </div>
    </Box>
  );
};

export default WriterPage;
