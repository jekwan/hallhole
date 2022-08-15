import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

import PerformanceInformation from "../organism/PerformanceInformation";
import ReviewList from "../organism/ReviewList";

import { fetchPerformance } from "../../apis/performance";
import { useParams } from "react-router-dom";

const reviewListStyle = {
  position: "relative",
  zIndex: 3,
  width: "90%",
  margin: "auto",
};

function RightPerformance({ performanceInfo, performanceMoreInfo, id }) {
  return (
    <Box>
      <PerformanceInformation
        performanceInfo={performanceInfo}
        performanceMoreInfo={performanceMoreInfo}
        id={id}
      ></PerformanceInformation>
      <Box sx={reviewListStyle}>
        <ReviewList id={id}></ReviewList>
      </Box>
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
  }, [id]);

  function requestPerformanceInfoSuccess(res) {
    setPerformanceInfo(res.data.performance);
    setPerformanceMoreInfo(res.data);
  }

  function requestPerformanceInfoFail(err) {}

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
  return info === [];
}
