import React, { useState, useEffect } from "react";

import { Box } from "@mui/system";

import PosterImage from "../atom/PosterSize";
import TextStyle from "../atom/Text";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CurtainsIcon from "@mui/icons-material/Curtains";

import { checkLikeStatus, likePerformance, unlikePerformance } from "../../apis/performanceLike";
import { useSelector } from "react-redux";

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
  alignItems: "center",
};

const performanceDetailStyle = {
  position: "relative",
  top: "17vh",
  width: 1,
  height: "40vh",
};

export default function PerformanceInformation({ performanceInfo, performanceMoreInfo, id }) {
  const [performanceLike, setPerformanceLike] = useState("");
  const user = useSelector(state => state.user.info);
  const [userTag, setUserTag] = useState();
  
  function enterPerformanceChat(e) {
    e.preventDefault();
    // chat 연결 코드 추가 예정
    // Link to 해야함
    console.log("들어가는중");
  }

  function changeStrToDate(str) {
    if (str) {
      return str.slice(0, 10);
    }
  }

  useEffect(() => {
    if (user && performanceLike === "") {
      setUserTag(user?.idTag);
      checkLikeStatus(id, userTag, requestLikeStatusSuccess, requestLikeStatusFail);
      console.log(performanceLike)
    }
  }, [user]);

  function requestLikeStatusSuccess(res) {
    setPerformanceLike(res.data);
    console.log(res.data);
  }

  function requestLikeStatusFail(err) {
    //console.log("좋아요 여부 요청 실패", err);
  }

  function unlikeSuccess(res) {
    setPerformanceLike(!performanceLike);
    console.log(performanceLike)
  }

  function unlikeFail(err) {
    console.log("좋아요 해제 실패", err);
  }

  function likeSuccess(res) {
    setPerformanceLike(!performanceLike);
    console.log(res)
    console.log(performanceLike)
  }

  function likeFail(err) {
    console.log("좋아요 실패", err);
  }

  function changePerformanceLike(e) {
    e.preventDefault();
    //console.log("좋아요 버튼 ");
    if (performanceLike === true) {
      unlikePerformance(userTag, id, unlikeSuccess, unlikeFail);
    } else {
      likePerformance(userTag, id, likeSuccess, likeFail);
    }
  }

  return (
    <Box>
      <Box sx={posterBackgroundStyle}>
        <PosterImage type="blur" size="full" src={performanceInfo.poster}></PosterImage>
      </Box>
      <Box sx={smallPosterStyle}>
        <PosterImage size="small" src={performanceInfo.poster}></PosterImage>
        <Box sx={{ mt: 6 }}>
          <CurtainsIcon sx={{ mr: 1.5 }} color="action" fontSize="large" onClick={enterPerformanceChat} />
          {performanceLike === false ? (
            <FavoriteIcon onClick={changePerformanceLike} fontSize="large" color="primary" />
          ) : (
            <FavoriteBorderIcon onClick={changePerformanceLike} fontSize="large" color="primary" />
          )}
        </Box>
      </Box>
      <Box bgcolor="white" sx={performanceDetailStyle}>
        <Box height={80}></Box>
        <Box sx={{ mx: 2, mb: 1 }}>
          <TextStyle size="large" variant="black">
            {performanceInfo.name}
          </TextStyle>
          <br></br>
          <TextStyle size="small" variant="black">
            {performanceInfo.genre} · {performanceMoreInfo.runtime}
          </TextStyle>
          <br></br>
          <TextStyle size="small" variant="black">
            📍 {performanceInfo.facility_name}
          </TextStyle>
          <br></br>
          <TextStyle size="small" variant="black">
            🗓 {changeStrToDate(performanceInfo.startDate)} - {changeStrToDate(performanceInfo.endDate)}
          </TextStyle>
          <br></br>
          <TextStyle size="small" variant="black">
            👫 출연진 :{performanceMoreInfo.actor}
          </TextStyle>
        </Box>
      </Box>
    </Box>
  );
}
