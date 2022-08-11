import React from "react";

import { Box } from "@mui/system";

import TextStyle from "../atom/Text";

const posterStyle = {
  width: "100vw",
  height: "20vh",
  display: "flex",
  filter: "blur(3px)",
  position: "absolute",
};

const imageStyle = {
  position: "absolute",
  width: "100vw",
  height: "20vh",
  overflow: "hidden",
  objectFit: "cover",
};

const coverStyle = {
  position: "absolute",
  width: "100vw",
  height: "20vh",
  backgroundColor: "#808080",
  opacity: 0.25,
  zIndex: 2,
};

const posterTextStyle = {
  color: "white",
  position: "absolute",
  bottom: "2.5vh",
  left: "5vw",
  zIndex: 3,
};

export default function PerformanceMiniPoster(props) {
  // props로 넘어오는 것 : img url , 공연 title, 공연 기간

  return (
    <Box sx={{ position: "relative", height: "20vh" }}>
      <Box sx={posterStyle}>
        <img src={props.img} style={imageStyle}></img>
      </Box>
      <Box sx={coverStyle} />
      <Box sx={posterTextStyle}>
        <TextStyle size="medium">{props.title}</TextStyle>
        <br></br>
        <TextStyle size="small">{props.date}</TextStyle>
      </Box>
    </Box>
  );
}
