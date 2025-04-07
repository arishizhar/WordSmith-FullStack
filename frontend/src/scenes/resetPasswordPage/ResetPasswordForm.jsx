import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

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

const ResetPasswordForm = () => {
  const { palette } = useTheme();
  const { token } = useParams();
  const isNonMobile = useMediaQuery("(min-width:650px)");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const resetPasswordSchema = z
    .object({
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string().min(6, "Confirm password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const onResetSubmit = async (data) => {
    setLoading(true);
    console.log("Submitting .....", data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(resetPasswordSchema), mode: "onChange" });
  return (
    <>
      <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
        Enter your new password twice to verify
      </Typography>

      <Box
        display="grid"
        gap="2rem"
        gridTemplateColumns="repeat(auto-fit, minmax(20rem,1fr))"
      >
        <form onSubmit={handleSubmit(onResetSubmit)}>
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

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
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </Box>
          <Link to={"/auth/login"} style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": { cursor: "pointer", color: palette.primary.light },
              }}
            >
              Back to login
            </Typography>
          </Link>
        </form>
      </Box>
    </>
  );
};
export default ResetPasswordForm;
