import { Box } from "@mui/system";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { writeComment } from "../../apis/comment";

import ButtonStyle from "../atom/Button";
import Input from "../atom/Input";

export default function CommentForm({ reviewId }) {
  const user = useSelector(state => state.user.info);
  const [commentContent, setCommentContent] = useState([]);


  function writeCommentSuccess(res) {
    setCommentContent("");
    window.location.reload() 
  }

  function writeCommentFail(err) {}
  function commentSubmit(e) {
    e.preventDefault();
    writeComment(commentContent, user?.idTag, reviewId, writeCommentSuccess, writeCommentFail);
  }

  return (
    <Box sx={{ display: "flex", width: "90%", margin: "auto", alignItems: "center" }}>
      <Input
        variant="outlined"
        value={commentContent}
        size="large"
        label="Comment"
        type="text"
        onChange={e => setCommentContent(e.target.value)}
      ></Input>
      <ButtonStyle size="none" onClick={commentSubmit}>
        작성
      </ButtonStyle>
    </Box>
  );
}
