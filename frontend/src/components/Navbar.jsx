import { useState } from "react";
import { themeSettings } from "../theme/theme";
import useThemeStore from "../stores/themeStore";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";

import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Menu,
  Close,
  Create,
  Help,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import useAuthStore from "../stores/authStore";
import useLoginPromptStore from "../stores/loginPromptStore";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const navigate = useNavigate();
  const isNonMobileScreen = useMediaQuery("(min-width :1000px)");

  const mode = useThemeStore((state) => state.mode);
  const toggleTheme = useThemeStore((state) => state.toggleMode);

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  // Importing stores

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const error = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { openPrompt } = useLoginPromptStore();

  let fullName = "";

  if (isAuthenticated) {
    const first = user?.firstname ?? "";
    const last = user?.lastname ?? "";
    fullName = `${first.charAt(0).toUpperCase() + first.slice(1)} ${
      last.charAt(0).toUpperCase() + last.slice(1)
    }`;
  }

  //Auth functions in navbar
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/auth/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };

  const handleWriterClick = () => {
    if (!isAuthenticated) {
      openPrompt();
      return;
    }
    navigate("/writer");
  };

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem,2rem,2.25rem)"
          color="primary"
          onClick={() => navigate("/")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          WordSmith
        </Typography>
        {isNonMobileScreen && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>
      {/* Desktop Navbar */}
      {isNonMobileScreen ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={toggleTheme}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>

          <IconButton
            onClick={handleWriterClick}
            sx={{
              "&:hover": {
                color: dark,
              },
            }}
          >
            <Create sx={{ color: dark, fontSize: "25px" }} />
          </IconButton>
          {isAuthenticated ? (
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": { pr: "0.25rem", width: "3rem" },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                {/* implement the logout function */}
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              </Select>
            </FormControl>
          ) : (
            <FlexBetween gap="1rem">
              <Button
                onClick={handleLogin}
                variant="outlined"
                sx={{
                  color: theme.palette.text.primary,
                  borderColor: theme.palette.text.primary,
                  "&:hover": {
                    borderColor: primaryLight,
                    color: primaryLight,
                  },
                }}
              >
                Login
              </Button>
              <Button
                onClick={handleRegister}
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  "&:hover": {
                    backgroundColor: primaryLight,
                  },
                }}
              >
                Register
              </Button>
            </FlexBetween>
          )}
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* Mobile Nav */}
      {!isNonMobileScreen && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="30px"
          backgroundColor={background}
        >
          {/* Close mobile menu button */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* Menu Items */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton onClick={toggleTheme}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>

            <IconButton
              onClick={handleWriterClick}
              sx={{
                "&:hover": {
                  color: dark,
                },
              }}
            >
              <Create sx={{ color: dark, fontSize: "25px" }} />
            </IconButton>

            {/* If authenticated render the logout menu with name else login and register button  */}
            {isAuthenticated ? (
              <FormControl variant="standard" value={fullName}>
                <Select
                  value={fullName}
                  sx={{
                    backgroundColor: neutralLight,
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": { pr: "0.25rem", width: "3rem" },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralLight,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={fullName}>
                    <Typography>{fullName}</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                </Select>
              </FormControl>
            ) : (
              <FlexBetween flexDirection="column" gap="1rem">
                <Button
                  onClick={handleLogin}
                  variant="outlined"
                  sx={{
                    color: theme.palette.text.primary,
                    borderColor: theme.palette.text.primary,
                    "&:hover": {
                      borderColor: primaryLight,
                      color: primaryLight,
                    },
                    width: "120px",
                  }}
                >
                  Login
                </Button>
                <Button
                  onClick={handleRegister}
                  variant="contained"
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    "&:hover": {
                      backgroundColor: primaryLight,
                    },
                    width: "120px",
                  }}
                >
                  Register
                </Button>
              </FlexBetween>
            )}
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
