import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

import PerformanceInformation from "../organism/PerformanceInformation";
import ReviewList from "../organism/ReviewList";

import CategoryDivider from "../atom/CategoryDivider";
import ButtonStyle from "../atom/Button";

import { fetchPerformance } from "../../apis/performance";
import { getPerformanceReviewList } from "../../apis/review";
import { useParams } from "react-router-dom";

const reviewListStyle = {
  position: "relative",
  zIndex: 3,
  width: "90%",
  margin: "auto",
  // marginY: 1,
};

const reviewButtonStyle = {
  position: "sticky",
  bottom: 0,
  zIndex: 1000,
  marginBottom: 1,
  textAlign: "center",
};

function RightPerformance({ performanceInfo, performanceMoreInfo, id, performanceReviewList }) {
  return (
    <Box>
      <PerformanceInformation
        performanceInfo={performanceInfo}
        performanceMoreInfo={performanceMoreInfo}
        id={id}
      ></PerformanceInformation>
      <Box sx={reviewListStyle}>
        <ReviewList performanceReviewList={performanceReviewList}></ReviewList>
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
  const [performanceReviewList, setPerformanceReviewList] = useState([]);
  //공연 정보 설정
  useEffect(() => {
    fetchPerformance(id, requestPerformanceInfoSuccess, requestPerformanceInfoFail);
    getPerformanceReviewList(id, 5, 1, getPerformanceReviewListSuccess, getPerformanceReviewListFail);
  }, [id]);

  function requestPerformanceInfoSuccess(res) {
    setPerformanceInfo(res.data.performance);
    setPerformanceMoreInfo(res.data);
  }
  function getPerformanceReviewListSuccess(res) {
    setPerformanceReviewList(res.data);
    console.log("성공", res.data);
  }

  function getPerformanceReviewListFail(err) {
    console.log("실패", err);
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
        performanceReviewList={performanceReviewList}
      />
    );
  }
}

function validatePerformanceInfo(info) {
  return info === [];
}
