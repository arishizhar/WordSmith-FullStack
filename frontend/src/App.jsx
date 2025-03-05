import React, { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme/theme";
import useThemeStore from "./stores/themeStore";

// Component and Pages Imports
// import Navbar from "./components/Navbar";
import Navbar from "./components/navbar";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import WriterPage from "./scenes/writerPage";

const App = () => {
  const mode = useThemeStore((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  console.log("Theme Mode in App:", mode); // Debugging log

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/writer" element={<WriterPage />} />
          <Route path="/editor" element={<h2>Editor Page</h2>} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
