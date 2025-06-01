import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../stores/authStore";

import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import Dropzone from "react-dropzone";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLocation, useNavigate } from "react-router-dom";

const AuthForm = () => {
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:650px)");
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const pathname = location.pathname.replace(/\/$/, "");
  const isLogin = pathname === "/auth/login";

  const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
  });

  const schema = isLogin ? loginSchema : forgotPasswordSchema;

  // Importing stores
  const login = useAuthStore((state) => state.login);
  const apiCall = useAuthStore((state) => state.apiCall);
  const error = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);

  // Clear error when component mounts or when switching between forms
  useEffect(() => {
    if (clearError) {
      clearError();
    }
  }, [isLogin, clearError]);

  const onLoginSubmit = async (data) => {
    setLoading(true);

    const { email, password } = data;
    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate("/");
    }
    // Error will now be automatically set in the store and displayed
  };

  const onForgotPasswordSubmit = async (data) => {
    setLoading(true);
    console.log("sending email .....", data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({ resolver: zodResolver(schema), mode: "onChange" });

  // Clear store error when user starts typing
  const handleInputChange = () => {
    if (error && clearError) {
      clearError();
    }
  };

  const onSubmit = isLogin ? onLoginSubmit : onForgotPasswordSubmit;

  return (
    <>
      {isLogin ? (
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome back to WordSmith, the Social Blogging Website! Please Login
          Below
        </Typography>
      ) : (
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Enter the email address linked to your account. If an account exists,
          we'll send you a one time password
        </Typography>
      )}

      <Box
        display="grid"
        gap="2rem"
        gridTemplateColumns="repeat(auto-fit, minmax(20rem,1fr))"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            onChange={handleInputChange} // Clear error on input change
          />
          {/*  Only show password for the login form */}
          {isLogin && (
            <>
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                onChange={handleInputChange} // Clear error on input change
              />
              <Link
                to="/auth/forgot-password"
                style={{ textDecoration: "none" }}
              >
                <Typography
                  sx={{
                    textDecoration: "underline",
                    color: palette.primary.main,
                    "&:hover": {
                      cursor: "pointer",
                      color: palette.primary.light,
                    },
                  }}
                >
                  Forgot Password?
                </Typography>
              </Link>
            </>
          )}

          {/* Show Log In Button */}
          <Box>
            <Button
              fullWidth
              type="submit"
              disabled={loading} // Disable button while loading
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": {
                  backgroundColor: "#66E5FA",
                },
                "&:disabled": {
                  backgroundColor: palette.action.disabled,
                },
              }}
            >
              {loading
                ? isLogin
                  ? "Logging in..."
                  : "Sending Email..."
                : isLogin
                ? "Login"
                : "Send Email"}
            </Button>

            {/* Display error message */}
            {error && isLogin && (
              <Typography color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
          </Box>

          {/* Register here and back to login links */}
          <Link
            to={isLogin ? "/register" : "/auth/login"}
            style={{ textDecoration: "none" }}
          >
            <Typography
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": { cursor: "pointer", color: palette.primary.light },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up Here"
                : "Back to login"}
            </Typography>
          </Link>
        </form>
      </Box>
    </>
  );
};

export default AuthForm;
