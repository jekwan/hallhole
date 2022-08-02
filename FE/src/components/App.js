import React from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import Intro from "./page/Intro";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      week: "#E38F8F",
      main: "#E37373",
      strong: "#A34545",
    },
    secondary: {
      main: "#f50057",
    },
    base: {
      white: "#FFFFFF",
      gray: "gray",
      grey: "gray",
      black: "#000000",
      blackDim: "#000000B0",
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Intro></Intro>
    </ThemeProvider>
  );
}
