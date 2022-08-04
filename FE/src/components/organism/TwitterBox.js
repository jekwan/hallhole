import TwitterIcon from "@mui/icons-material/Twitter";
import Box from "@mui/material/Box";
import * as React from "react";

export default function TwitterBox() {
  return (
    <Box
      sx={{
        width: 330,
        height: 330,
        marginX: 4,
        border: 2,
        borderColor: "SteelBlue",
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          margin: 1,
          width: 35,
          backgroundColor: "SteelBlue",
          marginLeft: "85%",
          marginTop: -0.5,
          height: 60,
        }}
      >
        <TwitterIcon style={{ color: "white" }} fontSize="large" />
      </Box>
      <Box
        sx={{
          margin: 1,
          width: 35,
          height: 35,
          backgroundColor: "white",
          marginLeft: "85%",
          marginTop: -2.5,
          transform: "rotate(45deg)",
        }}
      >
        <TwitterIcon style={{ color: "white" }} fontSize="large" />
      </Box>
    </Box>
  );
}
