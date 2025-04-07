import { red } from "@mui/material/colors";
import Tiptap from "./TipTap";
import { Box, useTheme } from "@mui/material";

const WriterPage = () => {
  const theme = useTheme();

  return (
    <Box
      width="60%"
      // backgroundColor="red"
      p="1rem 6%"
      mx="auto"
      sx={{
        display: "flex",
      }}
    >
      <div
        style={{
          backgroundColor: theme.palette.background.default, 
          color: theme.palette.text.primary, 
          padding: "2rem",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <h1>Writer Page</h1>
        <Tiptap />
      </div>
    </Box>
  );
};

export default WriterPage;
