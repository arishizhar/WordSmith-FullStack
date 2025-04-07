import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

const RegisterForm = () => {
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:650px)");
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const registerSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const onRegisterSubmit = async (data) => {
    setLoading(true);
    console.log("Registering User .....", data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema), mode: "onChange" });

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
          <TextField
            label="First Name"
            fullWidth
            margin="normal"
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ gridColumn: "span 4" }}
          />
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
          <Button
            fullWidth
            type="submit"
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
