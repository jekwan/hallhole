import React, { useState, useEffect } from "react";

import LikePerfoPagination from "../molecule/LikePerfoPagination";


import { useParams } from "react-router-dom";
import TextStyle from "../atom/Text";
import CategoryDivider from "../atom/CategoryDivider";
import { pickedPerformance } from "../../apis/performanceLike";
import { Box } from "@mui/system";

export default function LikedPerformance() {
  const { id } = useParams();
  const [likePerformanceList, setLikePerformanceList] = useState([]);

  useEffect(() => {
    pickedPerformance(id, 100, 0, getLikePerformanceListSuccess, getLikePerformanceListFail);
  }, [id]);

  function getLikePerformanceListSuccess(res) {
    setLikePerformanceList(res.data.reverse());
  }

  function getLikePerformanceListFail(err) { }

  return (
    <Box sx={{ width: "90%", margin: "auto", mt: 2 }}>
      <TextStyle variant="primary" size="large">👍 좋아요 한 공연</TextStyle>
      <CategoryDivider type="primary"></CategoryDivider>
      <LikePerfoPagination likePerformanceList={likePerformanceList} />
    </Box>
  )
}