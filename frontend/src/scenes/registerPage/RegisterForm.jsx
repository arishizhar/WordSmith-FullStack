import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import CloudinaryDropzone from "../../components/CloudinaryDropzone";

// Setup axios instance
const API = axios.create({
  baseURL: "http://localhost:5001/api",
});

// Validation schema with username
const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const RegisterForm = () => {
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:650px)");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [avatarImage, setAvatarImage] = useState("");
  const [imageStatus, setImageStatus] = useState(""); // "uploading", "uploaded"
  const [message, setMessage] = useState({ type: "", text: "" }); // "success" | "error"

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onRegisterSubmit = async (data) => {
    if (imageStatus === "uploading") {
      setMessage({
        type: "error",
        text: "Please wait until the image is uploaded.",
      });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    const payload = {
      firstname: data.firstName,
      lastname: data.lastName,
      username: data.username,
      email: data.email,
      password: data.password,
      avatarImage,
    };

    try {
      const response = await API.post("/user/register", payload);
      setMessage({
        type: "success",
        text: "Registration successful! Redirecting to login...",
      });
      setTimeout(() => navigate("/auth/login"), 3000);
    } catch (error) {
      const msg = error.response?.data?.message || "Registration failed.";
      setMessage({ type: "error", text: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
        Welcome to WordSmith, the Social Blogging Website! Please Register Below
      </Typography>

      <form onSubmit={handleSubmit(onRegisterSubmit)}>
        <Box
          display="grid"
          gap="0.5rem"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{ "& > *": { gridColumn: isNonMobile ? undefined : "span 4" } }}
        >
          {/* First Name */}
          <TextField
            label="First Name"
            fullWidth
            margin="normal"
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            sx={{ gridColumn: "span 2" }}
          />

          {/* Last Name */}
          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            sx={{ gridColumn: "span 2" }}
          />

          {/* Username */}
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
            sx={{ gridColumn: "span 4" }}
          />

          {/* Image Status */}
          {imageStatus === "uploading" && (
            <Typography color="warning.main" sx={{ gridColumn: "span 4" }}>
              Uploading image...
            </Typography>
          )}
          {imageStatus === "uploaded" && (
            <Typography color="success.main" sx={{ gridColumn: "span 4" }}>
              Image uploaded successfully!
            </Typography>
          )}

          {/* Cloudinary Upload */}
          <Box sx={{ gridColumn: "span 4" }}>
            <CloudinaryDropzone
              onStart={() => setImageStatus("uploading")}
              onComplete={(url) => {
                setAvatarImage(url);
                setImageStatus("uploaded");
              }}
            />
          </Box>

          {/* Email */}
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ gridColumn: "span 4" }}
          />

          {/* Password */}
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{ gridColumn: "span 4" }}
          />

          {/* Backend Message */}
          {message.text && (
            <Typography
              color={message.type === "success" ? "success.main" : "error.main"}
              sx={{ gridColumn: "span 4", mt: 1 }}
            >
              {message.text}
            </Typography>
          )}

          {/* Login Link */}
          <Typography
            component={Link}
            to="/auth/login"
            sx={{
              gridColumn: "span 4",
              textDecoration: "underline",
              color: palette.primary.main,
              "&:hover": {
                cursor: "pointer",
                color: palette.primary.light,
              },
            }}
          >
            Already have an account? Login Here
          </Typography>

          {/* Submit Button */}
          <Button
            fullWidth
            type="submit"
            disabled={loading}
            sx={{
              gridColumn: "span 4",
              m: "2rem 0",
              p: "1rem",
              backgroundColor: palette.primary.main,
              color: palette.background.alt,
              "&:hover": {
                backgroundColor: "#66E5FA",
              },
            }}
          >
            {loading ? "Registering User..." : "Register"}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default RegisterForm;
