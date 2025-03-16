import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import AuthForm from "./AuthForm";

const AuthPage = () => {
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");

  return (
    <Box backgroundColor="red">
      {/* Header */}
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontSize="2rem" color="primary">
          Welcome Back to WordSmith
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreen ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to WordSmith, the Social Media for Bloggers!
        </Typography>
        <AuthForm />
      </Box>
    </Box>
  );
};

export default AuthPage;
