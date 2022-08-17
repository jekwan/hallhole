import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box } from "@mui/system";

import PosterImage from "../atom/PosterSize";
import TextStyle from "../atom/Text";
import ChatRoom from "../page/ChatRoom";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatIcon from "@mui/icons-material/Chat";

import { checkLikeStatus, likePerformance, unlikePerformance } from "../../apis/performanceLike";
import { setChatId, setChatToggle } from "../../stores/chat";

const smallPosterStyle = {
  position: "relative",
  top: "14vh",
  zIndex: 2,
  marginX: 2,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const performanceDetailStyle = {
  width: 1,
};

const posterStyle = {
  width: "100vw",
  height: "20vh",
  display: "flex",
  filter: "blur(2px)",
  position: "absolute",
};

const imageStyle = {
  position: "absolute",
  width: "100vw",
  height: "20vh",
  overflow: "hidden",
  objectFit: "cover",
};

export default function PerformanceInformation({ performanceInfo, performanceMoreInfo, id }) {
  const [performanceLike, setPerformanceLike] = useState("");
  const user = useSelector(state => state.user.info);
  const dispatch = useDispatch();

  function enterPerformanceChat(e) {
    e.preventDefault();
    // chat 연결 코드 추가 예정
    // Link to 해야함
    dispatch(setChatId(id));
    dispatch(setChatToggle("on"));
  }

  function changeStrToDate(str) {
    if (str) {
      return str.slice(0, 10);
    }
  }

  useEffect(() => {
    checkLikeStatus(id, user?.idTag, requestLikeStatusSuccess, requestLikeStatusFail);
  }, [user]);

  function requestLikeStatusSuccess(res) {
    setPerformanceLike(res.data);
    console.log("performance like >>> ", res.data);
  }

  function requestLikeStatusFail(err) {
    console.log("좋아요 여부 요청 실패", err);
  }

  // 좋아요 상태확인
  function showStatus() {
    checkLikeStatus(id, user?.idTag, requestLikeStatusSuccess, requestLikeStatusFail);
  }

  // 공연 좋아요 해제 성공
  function unlikeSuccess(res) {
    setPerformanceLike(false);
  }

  // 좋아요 해제 실패
  function unlikeFail(err) {
    console.log("좋아요 해제 실패", err);
  }

  // 공연 좋아요 성공
  function likeSuccess(res) {
    setPerformanceLike(true);
  }

  // 좋아요 누르기 자체 실패
  function likeFail(err) {
    console.log("좋아요 실패", err);
  }

  function changePerformanceLike(e) {
    e.preventDefault();
    if (performanceLike === true) {
      unlikePerformance(user?.idTag, id, unlikeSuccess, unlikeFail);
    } else {
      likePerformance(user?.idTag, id, likeSuccess, likeFail);
    }
  }

  return (
    <Box>
      <Box sx={posterStyle}>
        <img src={performanceInfo.poster} style={imageStyle}></img>
      </Box>
      <Box sx={smallPosterStyle}>
        <PosterImage size="small" src={performanceInfo.poster}></PosterImage>
        <Box sx={{ mt: 6 }}>
          <ChatIcon sx={{ mr: 1.5 }} color="primary" fontSize="large" onClick={enterPerformanceChat} />
          {performanceLike === false ? (
            <FavoriteBorderIcon onClick={changePerformanceLike} fontSize="large" color="primary" />
          ) : (
            <FavoriteIcon onClick={changePerformanceLike} fontSize="large" color="primary" />
          )}
        </Box>
      </Box>
      <Box bgcolor="white" sx={performanceDetailStyle}>
        <Box sx={{ height: "15vh" }}></Box>
        <Box sx={{ mx: 2, mb: 1 }}>
          <TextStyle size="medium" variant="black" weight="bold">
            {performanceInfo.name}
          </TextStyle>
          <br/>
          <TextStyle size="smaller" variant="black" weight="lighter">
            {performanceInfo.genre} · {performanceMoreInfo.runtime}
          </TextStyle>
          <br/>
          <TextStyle size="smaller" variant="black">
            📍 {performanceInfo.facility_name}
          </TextStyle>
          <br/>
          <TextStyle size="smaller" variant="black">
            🗓 {changeStrToDate(performanceInfo.startDate)} - {changeStrToDate(performanceInfo.endDate)}
          </TextStyle>
          <br/>
          <TextStyle size="smaller" variant="black">
            👫 출연진 :{performanceMoreInfo.actor}
          </TextStyle>
        </Box>
      </Box>
      <ChatRoom />
    </Box>
  );
}
