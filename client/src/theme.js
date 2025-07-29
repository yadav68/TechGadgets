import { createTheme } from "@mui/material/styles";

// Create theme function that accepts mode parameter
export const createAppTheme = (mode = "light") => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "dark" ? "#90caf9" : "#1976d2",
      },
      secondary: {
        main: mode === "dark" ? "#f48fb1" : "#dc004e",
      },
      background: {
        default: mode === "dark" ? "#121212" : "#ffffff",
        paper: mode === "dark" ? "#1e1e1e" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#ffffff" : "#000000",
        secondary: mode === "dark" ? "#b0b0b0" : "#666666",
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "dark" ? "#2d2d2d" : "#ffffff",
            "&:hover": {
              backgroundColor: mode === "dark" ? "#3d3d3d" : "#f5f5f5",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "dark" ? "#2d2d2d" : "#ffffff",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "dark" ? "#1e1e1e" : "#1976d2",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          contained: {
            "&:hover": {
              backgroundColor: mode === "dark" ? "#4d4d4d" : undefined,
            },
          },
        },
      },
    },
    typography: {
      allVariants: {
        color: mode === "dark" ? "#ffffff" : "#000000",
      },
    },
  });
};

// Default light theme for backward compatibility
const theme = createAppTheme("light");
export default theme;
