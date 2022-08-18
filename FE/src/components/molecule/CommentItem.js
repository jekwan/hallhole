import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Box } from "@mui/system";
import { CardHeader } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

import ProfileImage from "../atom/ProfileImage";
import TextStyle from "../atom/Text";
import { deleteComment } from "../../apis/comment";
import { requestName } from "../../apis/user";
import { Link } from "react-router-dom";

export default function CommentItem({ idTag, commentId, memberAcc, memberBg, memberChar, contents, writingTime }) {
  const user = useSelector(state => state.user.info);
  const [commentWriterName, setCommentWriterName] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    checkCommentUser();
  }, [user]);

  useEffect(() => {
    requestName(idTag, getWriterNameSuccess, getWriterNameFail);
  }, [idTag]);

  function getWriterNameSuccess(res) {
    setCommentWriterName(res.data);
    // console.log("닉네임 조회 성공", res.data);
  }

  function getWriterNameFail(err) {
    // console.log("닉네임 조회 실패", err);
  }
  // 댓글 유저의 프로필로 이동하는 함수
  function moveToCommentProfile(e) {
    e.preventDefault();
  }

  function deleteThisComment(e) {
    e.preventDefault();
    console.log("눌리고있음");
    deleteComment(commentId, user?.idTag, deleteCommentSuccess, deleteCommentFail);
  }

  function deleteCommentSuccess(res) {
    window.location.reload();
  }

  function deleteCommentFail(err) {
    console.log(err);
  }

  function changeStrToDate(str) {
    if (str) {
      return str.slice(0, 10);
    }
  }

  function checkCommentUser() {
    return user?.idTag === idTag;
  }

  function getFormattedTime(time) {
    const seconds = (currentTime - time) / 1000;
    if (seconds < 60) return `방금`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월`;
    const years = days / 365;
    return `${Math.floor(years)}년`;
  }

  return (
    <Box sx={{ my: 1 }}>
      <CardHeader
        sx={{ padding: 0.5 }}
        avatar={
          <Link to={`/profile/${idTag}`} style={{ textDecoration: "none" }}>
            <ProfileImage type="small" char={memberChar} acc={memberAcc} />
          </Link>
        }
        title={
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ width: "90%" }}>
              <TextStyle size="small" weight="bold" variant="black">
                {commentWriterName}&nbsp;&nbsp;&nbsp;
              </TextStyle>
              <br></br>
              <TextStyle size="small" variant="black">
                {contents}
              </TextStyle>
              <br></br>
              <TextStyle size="small" variant="grey">
                {getFormattedTime(new Date(writingTime))}
              </TextStyle>
            </Box>
            {checkCommentUser() ? (
              <IconButton onClick={deleteThisComment}>
                <ClearIcon sx={{ fontSize: "large" }} />
              </IconButton>
            ) : null}
          </Box>
        }
      ></CardHeader>
    </Box>
  );
}
