import { Box } from "@mui/system";
import React from "react";

import PerformanceInformation from "../organism/PerformanceInformation";
import ReviewList from "../organism/ReviewList";

import CategoryDivider from "../atom/CategoryDivider";
import ButtonStyle from "../atom/Button";


const contentStyle = {
  width: "100vw",
  height: "100vh",
};

const reviewListStyle = {
  position: "relative",
  zIndex: 3,
  width: "100%",
  marginLeft: 2,
  marginY: 1,
};

const reviewButtonStyle = {
  position: "sticky",
  bottom: 0,
  zIndex: 1000,
  marginBottom: 1,
  textAlign : "center",
};

export default function PerformanceDetail() {
  return (
    <Box sx={contentStyle}>
      <PerformanceInformation></PerformanceInformation>
      <Box sx={reviewListStyle}>
        <CategoryDivider type="negative" />
        <ReviewList></ReviewList>
      </Box>
      <Box sx={reviewButtonStyle}>
        <ButtonStyle size="large" variant="primary">
          후기 작성
        </ButtonStyle>
      </Box>
    </Box>
  );
}
