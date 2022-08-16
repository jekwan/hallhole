import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";

import PerformanceMiniPoster from "../molecule/PerformanceMiniPoster";
import ReviewInfo from "../organism/ReviewInfo";
import ButtonStyle from "../atom/Button";
import AlertModal from "../molecule/AlertModal";

import { fetchPerformance } from "../../apis/performance";
import { getReviewInfo } from "../../apis/review";
import { getReviewCommentCnt } from "../../apis/review";

import { useParams } from "react-router-dom";
import CategoryDivider from "../atom/CategoryDivider";
import CommentForm from "../molecule/CommentForm";
import CommentBox from "../organism/CommentBox";
import TextStyle from "../atom/Text";

export default function ReviewDetail() {
  const { reviewId } = useParams();
  const user = useSelector(state => state.user.info);
  const [reviewInformation, setReviewInformation] = useState([]);
  const [reviewPerfoInfo, setReviewPerfoInfo] = useState([]);
  const [commentCnt, setCommentCnt] = useState(0);

  useEffect(() => {
    getReviewInfo(reviewId, getReviewInfoSuccess, getReviewInfoFail);
    getReviewCommentCnt(reviewId, getReviewCommentCntSuccess, getReviewCommentCntFail);
    checkUser();
  }, [reviewId, user]);

  useEffect(() => {
    fetchPerformance(reviewInformation?.performanceId, getPerfoInfoSuccess, getPerfoInfoFail);
  }, [reviewInformation]);

  function getReviewCommentCntSuccess(res) {
    setCommentCnt(res.data);
  }

  function getReviewCommentCntFail(err) {}

  function getReviewInfoSuccess(res) {
    console.log("리뷰 요청 성공");
    setReviewInformation(res.data);
  }

  function getReviewInfoFail(err) {
    console.log("리뷰 요청 실패", err);
  }

  function getPerfoInfoSuccess(res) {
    console.log("리뷰 공연 정보 요청 성공");
    setReviewPerfoInfo(res.data);
  }

  function getPerfoInfoFail(err) {
    console.log("리뷰 공연 정보 요청 실패", err);
  }

  function checkUser() {
    return user?.idTag === reviewInformation?.writerTag;
  }

  return (
    <Box>
      <PerformanceMiniPoster
        img={reviewPerfoInfo?.performance?.poster}
        title={reviewPerfoInfo?.performance?.name}
        date={reviewPerfoInfo?.performance?.endDate}
      />
      <ReviewInfo data={reviewInformation} />
      <Box sx={{ width: "90%", margin: "auto", mt: 2 }}>
        <CategoryDivider type="negative" />
      </Box>
      {checkUser() ? (
        <Box sx={{ display: "flex", width: "44%", margin: "auto", my: 3, justifyContent: "space-between" }}>
          <AlertModal title="삭제" alertTitle="삭제하시겠습니까?" reviewId={`${reviewId}`}></AlertModal>
          {/* 수정페이지로 가는 링크 추가 */}
          <ButtonStyle size="smaller" variant="primary">
            수정
          </ButtonStyle>
        </Box>
      ) : (
        <Box />
      )}
      <Box sx={{ width: "90%", margin: "auto", my: 2 }}>
        <TextStyle size="medium" variant="black" weight="bold">
          댓글 {commentCnt}
        </TextStyle>
      </Box>
      {/* 댓글작성 */}
      <CommentForm reviewId={reviewId}></CommentForm>
      {/* 댓글박스 */}
      <CommentBox reviewId={reviewId} commentCnt={commentCnt} />
    </Box>
  );
}
