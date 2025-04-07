import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import ResetPasswordForm from "./ResetPasswordForm";
import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

const ResetPasswordPage = () => {
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const navigate = useNavigate();
  const location = useLocation();

  // redirect to /auth/login if user visits /auth
  //   useEffect(() => {
  //     if (location.pathname === "/auth") {
  //       navigate("/auth/login", { replace: true });
  //     }
  //   }, [location, navigate]);

  return (
    <Box backgroundColor="">
      {/* Header */}
      <Box
        width="100%"
        // backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontSize="2rem" color="primary">
          Reset Password
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreen ? "45%" : "93%"}
        p="2rem"
        m="1rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        {/* <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
            Welcome to WordSmith, the Social Media for Bloggers! 
          </Typography> */}
        <ResetPasswordForm />
      </Box>
    </Box>
  );
};

export default ResetPasswordPage;
