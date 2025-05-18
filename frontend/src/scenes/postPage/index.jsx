import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import "./postpage.scss";

const PostPage = () => {
  const theme = useTheme();
  const [htmlContent, setHtmlContent] = useState("");
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState("");

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

  const fetchPost = async () => {
    const res = await fetch("http://localhost:3001/posts/1");
    const jsonContent = await res.json();
    const content = jsonContent.content;
    const title = jsonContent.title;
    const cover_image = jsonContent.cover_image;
    console.log(cover_image);
    console.log("jsonlog", jsonContent);
    console.log("the content i hope", jsonContent.content);
    const html = generateHTML(content, htmlExtensions);
    console.log("Generated HTML:", html);
    setHtmlContent(html);
    setTitle(title);
    setCover(cover_image);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      <Box width="55%" p="1rem 6%" mx="auto">
        <div
          style={{
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            padding: "1rem",
            minHeight: "100vh",
            width: "100%",
          }}
        >
          <Typography
            fontSize="2.7rem"
            fontWeight="bold"
            align="center"
            color={theme.palette.text.primary}
          >
            {title}
          </Typography>

          {cover && (
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
                src={cover}
                alt="Cover"
                style={{
                  width: "100%",
                  objectFit: "cover",
                  maxHeight: "400px",
                  borderRadius: "8px",
                  padding: "0.5rem",
                }}
              />
            </Box>
          )}
          <div
            className="rendered-post"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </Box>
    </>
  );
};

export default PostPage;
