import React, { useMemo } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme/theme";
import useThemeStore from "./stores/themeStore";

// Component and Pages Imports
// import Navbar from "./components/Navbar";
import Navbar from "./components/navbar";
import HomePage from "./scenes/homePage";
import AuthPage from "./scenes/authPage";
import AuthForm from "./scenes/authPage/AuthForm";
import WriterPage from "./scenes/writerPage";
import ResetPasswordPage from "./scenes/resetPasswordPage";
import RegisterPage from "./scenes/registerPage";
import PostPage from "./scenes/postPage";
import LoginPromptModal from "./components/LoginPromptModal";

const App = () => {
  const mode = useThemeStore((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  console.log("Theme Mode in App:", mode); // Debugging log

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <LoginPromptModal />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />}>
            <Route index element={<Navigate to="/auth/login" />} />
            <Route path="login" element={<AuthForm />} />
            <Route path="forgot-password" element={<AuthForm />} />
          </Route>
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/writer" element={<WriterPage />} />
          <Route path="/editor" element={<h2>Editor Page</h2>} />
          <Route path="/post" element={<PostPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
