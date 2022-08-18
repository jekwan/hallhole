import React, { useEffect, useState } from "react";
import usePagination from "../molecule/SetPaginationData";
import { Pagination } from "@mui/material";

import ReviewItem from "../molecule/ReviewItem";
import { Box } from "@mui/system";

export default function ReviewPagination({ performanceReviewList }) {
  let [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const count = Math.ceil(performanceReviewList.length / PER_PAGE);
  const _DATA = usePagination(performanceReviewList, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <Box>
      <Box>
        {_DATA.currentData().map((item, i) => (
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
      <Box sx={{width: "100%", margin: "auto", my: 2}}>
        <Pagination sx={{display: "flex", justifyContent:"center"}} size="small" color="primary" shape="rounded" page={page} count={count} onChange={handleChange} />
      </Box>
    </Box>
  );
}
