import React from "react";
// import Card from "@mui/material/Card";
// import { CardActionArea } from "@mui/material";
import Text from "../atom/Text";
import Box from "@mui/material/Box";
// import PosterSize from "../atom/PosterSize";
import Input from "../atom/Input";
// import Button from "../atom/Button";
import SearchIcon from "@mui/icons-material/Search";
import CategoryDivider from "../atom/CategoryDivider";
import Dropdown from "../atom//Dropdown";

export default function Performance() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "240vh",
      }}
    >
      <Box sx={allPosition}>
        <Box sx={textQuestionDesign}>
          <Text variant="black" size="large">
            Performance
          </Text>
        </Box>
        <Box sx={inputPosition}>
          <Box sx={{ float: "left", marginLeft: "4%", marginRight: 0, marginTop: "0.5vh" }}>
            <SearchIcon sx={{ fontSize: 45, color: "#e37373" }} />
          </Box>
          <Box>
            <Input size="large" label="Search"></Input>
          </Box>
        </Box>

        <Box sx={{ marginLeft: "70vw", marginTop: "5vh" }}>
          <Dropdown />
        </Box>
        <Box sx={{ width: "90vw", marginX: "auto" }}>
          <CategoryDivider type="primary" />
        </Box>
      </Box>
    </Box>
  );
}

const allPosition = {
  top: "-40vh",
  textAlign: "center",
};

const textQuestionDesign = {
  marginTop: 3,
  marginBottom: 5,
  marginLeft: "-40%",
};

const inputPosition = {
  marginY: 2,
};
