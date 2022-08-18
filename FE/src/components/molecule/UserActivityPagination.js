import React, { useState } from "react";
import usePagination from "../molecule/SetPaginationData";
import { Pagination } from "@mui/material";

import ProfileReviewItem from "../molecule/ProfileReviewItem";
import { Box } from "@mui/system";

export default function UserActivityPagination({ reviewList }) {
  let [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const count = Math.ceil(reviewList.length / PER_PAGE);
  const _DATA = usePagination(reviewList, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <Box>
      <Box sx={{ ml: 1 }}>
        {_DATA.currentData().map((item, id) => (
          <ProfileReviewItem
            key={id}
            title={item.title}
            writing_time={item.writing_time}
            star_eval={item.star_eval}
            reviewId={item.id}
          ></ProfileReviewItem>
        ))}
      </Box>
      <Box sx={{ width: "100%", margin: "auto", my: 2 }}>
        <Pagination
          sx={{ display: "flex", justifyContent: "center" }}
          size="small"
          color="primary"
          shape="rounded"
          page={page}
          count={count}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
}
