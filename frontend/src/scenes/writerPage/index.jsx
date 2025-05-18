import { red } from "@mui/material/colors";
import Tiptap from "../../components/TipTap";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { Box, useTheme, TextField, Button } from "@mui/material";
import { useState, useRef } from "react";
import CoverImagePicker from "../../components/CoverImagePicker";
import ContentImagePicker from "../../components/ContentImagePicker";

const WriterPage = () => {
  const theme = useTheme();
  const editorRef = useRef(null);
  const [htmlContent, setHtmlContent] = useState("");

  const [coverImage, setCoverImage] = useState(null);
  const [coverPickerAnchorEl, setCoverPickerAnchorEl] = useState(null);
  const [contentPickerAnchorEl, setContentPickerAnchorEl] = useState(null);

  const htmlExtensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false,
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false,
      },
    }),
  ];

  const handlePublishSubmit = () => {
    const editor = editorRef.current;
    if (!editor) return;

    const content = editor.getJSON();
    const html = generateHTML(content, htmlExtensions);
    setHtmlContent(html);

    sendContentDB(content);
  };

  const sendContentDB = async (content) => {
    const newContent = {
      content: content,
      coverImage: coverImage,
    };

    const res = await fetch("http://localhost:3001/posts/1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContent),
    });

    if (res.ok) {
      console.log("Saved to DB successfully.");
    }
  };

  return (
    <Box width="60%" p="1rem 6%" mx="auto">
      <div
        style={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          padding: "1rem",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        {/* Top Row: Publish Button */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box />
          <Button
            type="button"
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

        {/* ✅ Cover Image Preview */}
        {coverImage && (
          <Box
            position="relative"
            my={2}
            sx={{
              width: "100%",
              maxHeight: "400px",
              overflow: "hidden",
              borderRadius: "8px",
            }}
          >
            <img
              src={coverImage}
              alt="Cover"
              style={{
                width: "100%",
                objectFit: "cover",
                maxHeight: "400px",
                borderRadius: "8px",
              }}
            />
            <Button
              onClick={() => setCoverImage(null)}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                minWidth: "auto",
                padding: "4px 8px",
                backgroundColor: "error.main",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "0.75rem",
                lineHeight: 1,
                "&:hover": {
                  backgroundColor: "error.dark",
                },
              }}
            >
              ✕
            </Button>
          </Box>
        )}

        {/* Editor */}
        <Tiptap
          editorRef={editorRef}
          onOpenCoverPicker={(event) =>
            setCoverPickerAnchorEl(event.currentTarget)
          }
          onOpenContentPicker={(event) =>
            setContentPickerAnchorEl(event.currentTarget)
          }
        />
      </div>

      {/* ✅ Cover Picker Popover */}
      {coverPickerAnchorEl && (
        <CoverImagePicker
          anchorEl={coverPickerAnchorEl}
          setCoverImage={(url) => setCoverImage(url)}
          onClose={() => setCoverPickerAnchorEl(null)}
        />
      )}

      {/* ✅ Content Picker Popover */}
      {contentPickerAnchorEl && (
        <ContentImagePicker
          anchorEl={contentPickerAnchorEl}
          editor={editorRef.current}
          onClose={() => setContentPickerAnchorEl(null)}
        />
      )}

      {/* Optional: Debug HTML Output */}
      {htmlContent && (
        <div
          style={{
            marginTop: "2rem",
            border: "2px solid blue",
            padding: "1rem",
          }}
        >
          <h2>Generated HTML:</h2>
          <div
            style={{ border: "1px solid #ccc", padding: "1rem" }}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      )}
    </Box>
  );
};

export default WriterPage;
