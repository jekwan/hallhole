import React, { useEffect, useState } from "react";

import ReviewItem from "../molecule/ReviewItem";
import CategoryDivider from "../atom/CategoryDivider";
import { Box } from "@mui/system";
import TextStyle from "../atom/Text";
import ButtonStyle from "../atom/Button";
import { getPerformanceReviewList } from "../../apis/review";
import { Link } from "react-router-dom";
import ReviewPagination from "../molecule/ReviewPagination";

export default function ReviewList({ id }) {
  const [performanceReviewList, setPerformanceReviewList] = useState([]);
  

  useEffect(() => {
    getPerformanceReviewList(id, 100, 0, getPerformanceReviewListSuccess, getPerformanceReviewListFail);
    checkReviewList();
  }, [id]);

  function getPerformanceReviewListSuccess(res) {
    setPerformanceReviewList(res.data);
  }

  function getPerformanceReviewListFail(err) {}

  function checkReviewList() {
    if (performanceReviewList !== [] && performanceReviewList.length === 0) {
      return (
        <Box sx={{ margin: "auto", width: "80%", mt: 3 }}>
          <TextStyle variant="grey" size="medium">
            {"아직 작성된 후기가 없어요 :)"}
          </TextStyle>
        </Box>
      );
    }
    else if (performanceReviewList !== [] && performanceReviewList.length <= 5) {
      return (
        <Box>
          {performanceReviewList.map((item, i) => (
            <ReviewItem
              key={i}
              title={item.title}
              written_date={item.writing_time}
              star_eval={item.star_eval}
              user={item.name}
              writerTag={item.writerTag}
              id={item.id}
            ></ReviewItem>
          ))}
        </Box>
      );
    } 
    else if (performanceReviewList !== [] && performanceReviewList.length > 5) {
      return (
        <ReviewPagination performanceReviewList={performanceReviewList}/>
      );
    }
  }

  return (
    <Box>
      <CategoryDivider type="negative" />
      <Box sx={{ my: 2 }}>
        <Link to={`/writereview/${id}`} style={{ textDecoration: "none" }}>
          <ButtonStyle size="large" variant="primary">
            후기 작성
          </ButtonStyle>
        </Link>
      </Box>
      <TextStyle size="medium" variant="primary">
        관람 후기 {performanceReviewList.length}
      </TextStyle>
      <Box>{checkReviewList()}</Box>
    </Box>
  );
}
