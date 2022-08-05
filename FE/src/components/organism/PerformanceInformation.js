import React, { useState } from "react";

import { Box } from "@mui/system";

import PosterImage from "../atom/PosterSize";
import TextStyle from "../atom/Text";
import ButtonStyle from "../atom/Button";

const posterBackgroundStyle = {
  position: "absolute",
  padding: 0,
  margin: 0,
  top: 0,
  left: 0,
  zIndex: -1,
};

const smallPosterStyle = {
  position: "relative",
  top: "25vh",
  zIndex: 1,
  marginX: 2,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "end",
};

const performanceDetailStyle = {
  position: "relative",
  top: "17vh",
  width: 1,
  height: "40vh",
};

export default function PerformanceInformation() {
  const [performanceLike, setPerformanceLike] = useState(false);

  function changePerformanceLike(e) {
    e.preventDefault();
    setPerformanceLike(!performanceLike);
  }

  return (
    <Box>
      <Box sx={posterBackgroundStyle}>
        <PosterImage type="blur" size="full" src="poster_1.gif"></PosterImage>
      </Box>
      <Box sx={smallPosterStyle}>
        <PosterImage size="small" src="poster_1.gif"></PosterImage>
        <ButtonStyle size="small" variant={performanceLike ? "grey" : "primary"} onClick={changePerformanceLike}>
          {performanceLike ? "좋아요취소" : "좋아요"}
        </ButtonStyle>
      </Box>
      <Box bgcolor="white" sx={performanceDetailStyle}>
        <Box height={80}></Box>
        <Box marginLeft={2}>
          <TextStyle size="large" variant="black">
            {"뮤지컬 <아이다>"}
          </TextStyle>
          <br></br>
          <TextStyle size="small" variant="black">
            뮤지컬 · 120분(인터미션 20분)
          </TextStyle>
          <br></br>
          <TextStyle size="small" variant="black">
            📍 공연장공연장
          </TextStyle>
          <br></br>
          <TextStyle size="small" variant="black">
            🗓 2022. 06. 15 - 10. 12
          </TextStyle>
          <br></br>
          <TextStyle size="small" variant="black">
            👫 출연진 :{" "}
          </TextStyle>
        </Box>
      </Box>
    </Box>
  );
}
