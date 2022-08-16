import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getReviewCommentList } from "../../apis/comment";

import CommentItem from "../molecule/CommentItem";

export default function CommentBox({ reviewId, commentCnt }) {
  const [reviewCommentList, setReviewCommentList] = useState([]);

  useEffect(() => {
    getReviewCommentList(reviewId, commentCnt, 0, getReviewCommentListSuccess, getReviewCommentListFail);
  }, [commentCnt]);

  function getReviewCommentListSuccess(res) {
    setReviewCommentList(res.data);
  }
  function getReviewCommentListFail(err) {

  }

  return (
    <Box sx={{ width: "90%", margin: "auto", mt: 3 }}>
      {reviewCommentList.map((item, id) => (
        <CommentItem
          key={id}
          idTag={item.idTag}
          commentId={item.commentId}
          memberAcc={item.memberAcc}
          memberBg={item.memberBg}
          memberChar={item.memberChar}
          contents={item.contents}
          writingTime={item.writingTime}
        />
      ))}
    </Box>
  );
}
