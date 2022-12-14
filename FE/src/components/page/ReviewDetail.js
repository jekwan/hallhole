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
          <AlertModal title="??????" alertTitle="?????????????????????????" reviewId={`${reviewId}`}></AlertModal>
          {/* ?????????????????? ?????? ?????? ?????? */}
          <Link to={`/editreview/${reviewId}`} style={{ textDecoration: "none" }}>
            <ButtonStyle size="smaller" variant="primary">
              ??????
            </ButtonStyle>
          </Link>
        </Box>
      ) : (
        <Box />
      )}
      <Box sx={{ width: "90%", mx: 2.5, mt: 3 }}>
        <TextStyle size="medium" variant="black" weight="bold">
          ??????
        </TextStyle>
      </Box>
      <Box sx={{ width: "90%", mx: 2.5, my: 2 }}>
        <CategoryDivider type="thinDark" />
        <TextStyle size="smaller" variant="black" weight="lighter">
          ?????? {commentCnt}?????? ????????? ??????????????????.
        </TextStyle>
      </Box>

      {/* ???????????? */}
      <CommentForm reviewId={reviewId}></CommentForm>
      {/* ???????????? */}
      <CommentBox reviewId={reviewId} commentCnt={commentCnt} />
    </Box>
  );
}
