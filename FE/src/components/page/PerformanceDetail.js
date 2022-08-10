import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

import PerformanceInformation from "../organism/PerformanceInformation";
import ReviewList from "../organism/ReviewList";

import CategoryDivider from "../atom/CategoryDivider";
import ButtonStyle from "../atom/Button";

import { fetchPerformance } from "../../apis/performance";
import { useParams } from "react-router-dom";

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
  textAlign: "center",
};

function RightPerformance({ performanceInfo, performanceMoreInfo, id }) {
  return (
    <Box sx={contentStyle}>
      <PerformanceInformation
        performanceInfo={performanceInfo}
        performanceMoreInfo={performanceMoreInfo}
        id={id}
      ></PerformanceInformation>
      <CategoryDivider type="negative" />
      {/* <Box sx={reviewListStyle}>
        <ReviewList></ReviewList>
      </Box>
      <Box sx={reviewButtonStyle}>
        <ButtonStyle size="large" variant="primary">
          후기 작성
        </ButtonStyle>
      </Box> */}
    </Box>
  );
}

function LoadingPerformance() {
  return <h1>로딩 중</h1>;
}
export default function PerformanceDetail() {
  const { id } = useParams();
  const [performanceInfo, setPerformanceInfo] = useState([]);
  const [performanceMoreInfo, setPerformanceMoreInfo] = useState([]);

  //공연 정보 설정
  useEffect(() => {
    fetchPerformance(id, requestPerformanceInfoSuccess, requestPerformanceInfoFail);
  }, [id])
  
  function requestPerformanceInfoSuccess(res) {
    setPerformanceInfo(res.data.performance);
    setPerformanceMoreInfo(res.data);
  }

  function requestPerformanceInfoFail(err) {
    console.log("공연 요청 실패", err);
  }

  // 조건부 렌더링
  if (validatePerformanceInfo(performanceInfo)) {
    return <LoadingPerformance />;
  } else {
    return (
      <RightPerformance
        performanceInfo={performanceInfo}
        performanceMoreInfo={performanceMoreInfo}
        id={id}
      />
    );
  }
}

function validatePerformanceInfo(info) {
  return (info === []);
}
