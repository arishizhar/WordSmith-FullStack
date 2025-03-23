import { useState } from "react";
import { Link } from "react-router-dom";

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

  //   const isLogin = location.pathname === "/auth/login";
  const isLogin = location.pathname.replace(/\/$/, "") === "/auth/login";

  const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
  });

  const schema = isLogin ? loginSchema : forgotPasswordSchema;

  console.log("schema type-", schema);
  console.log("pathname for now", location.pathname);

  const onLoginSubmit = async (data) => {
    setLoading(true);
    console.log("logging in .....", data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
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
  } = useForm({ resolver: zodResolver(schema), mode: "onChange" });

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
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": {
                  //   backgroundColor: palette.neutral.medium,
                  backgroundColor: "#66E5FA",
                  //   color: palette.neutral.dark,
                  //   color: palette.background.alt,
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
          </Box>

          {/* Show Send OTP button */}

          {/* Show Forgot password link on login form */}

          {/* Show Back to sign in if on password reset form */}

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
