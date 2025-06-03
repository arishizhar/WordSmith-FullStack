// components/LoginPromptModal.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useLoginPromptStore from "../stores/loginPromptStore";

const LoginPromptModal = () => {
  const navigate = useNavigate();
  const { isOpen, closePrompt } = useLoginPromptStore();

  return (
    <Dialog open={isOpen} onClose={closePrompt}>
      <DialogTitle>Login Required</DialogTitle>
      <DialogContent>
        <Typography>
          You need to be logged in to perform this action.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            closePrompt();
            navigate("/auth/login");
          }}
        >
          Login
        </Button>
        <Button
          onClick={() => {
            closePrompt();
            navigate("/register");
          }}
        >
          Register
        </Button>

        <Button onClick={closePrompt}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginPromptModal;
