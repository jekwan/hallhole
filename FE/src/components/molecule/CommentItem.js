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

export default function CommentItem({ idTag, commentId, memberAcc, memberBg, memberChar, contents, writingTime }) {
  const user = useSelector(state => state.user.info);
  const [commentWriterName, setCommentWriterName] = useState([]);

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
    window.location.reload() 
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

  return (
    <Box sx={{ my: 1 }}>
      <CardHeader
        sx={{ padding: 0.5 }}
        avatar={<ProfileImage type="small" src="" onClick={moveToCommentProfile} />}
        title={
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ width: "90%" }}>
              <TextStyle size="small" weight="bold" variant="black">
                {commentWriterName}&nbsp;&nbsp;&nbsp;
              </TextStyle>
              <TextStyle size="small" variant="grey">
                {changeStrToDate(writingTime)}
              </TextStyle>
              <br></br>
              <TextStyle size="small" variant="black">
                {contents}
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
