import { createTheme } from "@mui/material/styles";

export default createTheme({
  typography: {
    fontFamily: [
      "GmarketSansMedium",
      "GmarketSansLight",
      "GmarketSansBold",
      "Roboto",
    ].join(','),
  },
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
