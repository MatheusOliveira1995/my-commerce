"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  spacing: 4,
  shape: {
    borderRadius: 12,
  },
  palette: {
    mode: "light",
    primary: {
      main: "#F5A33A",
      light: "#FBD39A",
      dark: "#D88620",
      contrastText: "#1F2124",
    },
    secondary: {
      main: "#BFC9D3",
      light: "#D9E0E8",
      dark: "#AAB5C0",
      contrastText: "#2F3439",
    },
    background: {
      default: "#EFEFEF",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#2C3035",
      secondary: "#5D646C",
      disabled: "#9AA1A8",
    },
    divider: "#E6E6E6",
  },
  typography: {
    fontFamily: "var(--font-roboto), Arial, sans-serif",
    h1: {
      fontSize: "2.5rem",
      lineHeight: 1.2,
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontSize: "2rem",
      lineHeight: 1.25,
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontSize: "1.75rem",
      lineHeight: 1.3,
      fontWeight: 700,
    },
    h4: {
      fontSize: "1.5rem",
      lineHeight: 1.3,
      fontWeight: 700,
    },
    h5: {
      fontSize: "1.25rem",
      lineHeight: 1.35,
      fontWeight: 700,
    },
    h6: {
      fontSize: "1.125rem",
      lineHeight: 1.4,
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: "1rem",
      lineHeight: 1.5,
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: "0.875rem",
      lineHeight: 1.4,
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
      fontWeight: 400,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
      fontWeight: 400,
    },
    button: {
      fontSize: "0.875rem",
      lineHeight: 1.2,
      fontWeight: 700,
      textTransform: "none",
    },
    caption: {
      fontSize: "0.75rem",
      lineHeight: 1.4,
      fontWeight: 400,
    },
    overline: {
      fontSize: "0.75rem",
      lineHeight: 1.4,
      fontWeight: 600,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid #E6E6E6",
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingInline: 24,
          paddingBlock: 10,
        },
        outlined: {
          borderColor: "#F2BE85",
          color: "#2C3035",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "#2C3035",
          boxShadow: "none",
          borderRadius: 999,
        },
      },
    },
  },
});

export default theme;
