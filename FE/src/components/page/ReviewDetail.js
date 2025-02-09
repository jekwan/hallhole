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
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const INITIAL_REVIEW_INFORMATION = [];
export default function ReviewDetail() {
  const { reviewId } = useParams();
  const user = useSelector(state => state.user.info);
  const [reviewInformation, setReviewInformation] = useState(INITIAL_REVIEW_INFORMATION);
  const [reviewPerfoInfo, setReviewPerfoInfo] = useState([]);
  const [commentCnt, setCommentCnt] = useState(0);

  useEffect(() => {
    getReviewInfo(reviewId, getReviewInfoSuccess, getReviewInfoFail);
    getReviewCommentCnt(reviewId, getReviewCommentCntSuccess, getReviewCommentCntFail);
    checkUser();
  }, [reviewId]);

  function getReviewCommentCntSuccess(res) {
    setCommentCnt(res.data);
  }

  function getReviewCommentCntFail(err) {}

  function getReviewInfoSuccess(res) {
    const reviewInfo = res.data;
    setReviewInformation(reviewInfo);
    if (reviewInfo.performanceId) {
      fetchPerformance(reviewInfo?.performanceId, getPerfoInfoSuccess, getPerfoInfoFail);
    }
  }

  function getReviewInfoFail(err) {}

  function getPerfoInfoSuccess(res) {
    setReviewPerfoInfo(res.data);
  }

  function getPerfoInfoFail(err) {}

  function checkUser() {
    return user?.idTag === reviewInformation?.writerTag;
  }

  function backHistory() {
    window.history.back();
  }

  return (
    <Box>
      <Box sx={{ position: "absolute", zIndex: 13 }}>
        <KeyboardBackspaceIcon sx={{ ml: 2, mt: 2, fontSize: 30, color: "white" }} onClick={backHistory} />
      </Box>
      <Box sx={{ position: "relative", zIndex: 10 }}>
        <PerformanceMiniPoster
          img={reviewPerfoInfo?.performance?.poster}
          title={reviewPerfoInfo?.performance?.name}
          date={reviewPerfoInfo?.performance?.endDate}
        />
      </Box>
      <ReviewInfo data={reviewInformation} />
      <Box sx={{ width: "90%", margin: "auto", mt: 2 }}>
        <CategoryDivider type="negative" />
      </Box>
      {checkUser() ? (
        <Box sx={{ display: "flex", width: "44%", margin: "auto", my: 3, justifyContent: "space-between" }}>
          <AlertModal title="삭제" alertTitle="삭제하시겠습니까?" reviewId={`${reviewId}`}></AlertModal>
          {/* 수정페이지로 가는 링크 추가 */}
          <Link to={`/editreview/${reviewId}`} style={{ textDecoration: "none" }}>
            <ButtonStyle size="smaller" variant="primary">
              수정
            </ButtonStyle>
          </Link>
        </Box>
      ) : (
        <Box />
      )}
      <Box sx={{ width: "90%", mx: 2.5, mt: 3 }}>
        <TextStyle size="medium" variant="black" weight="bold">
          댓글
        </TextStyle>
      </Box>
      <Box sx={{ width: "90%", mx: 2.5, my: 2 }}>
        <CategoryDivider type="thinDark" />
        <TextStyle size="smaller" variant="black" weight="lighter">
          현재 {commentCnt}개의 댓글이 달려있습니다.
        </TextStyle>
      </Box>

      {/* 댓글작성 */}
      <CommentForm reviewId={reviewId}></CommentForm>
      {/* 댓글박스 */}
      <CommentBox reviewId={reviewId} commentCnt={commentCnt} />
    </Box>
  );
}
