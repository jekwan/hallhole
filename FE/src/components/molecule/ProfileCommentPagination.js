import React, { useState } from "react";
import usePagination from "../molecule/SetPaginationData";
import { Pagination } from "@mui/material";

import ProfileCommentItem from "./ProfileCommentItem";
import { Box } from "@mui/system";

export default function ProfileCommentPagination({ commentList }) {
  let [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const count = Math.ceil(commentList.length / PER_PAGE);
  const _DATA = usePagination(commentList, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <Box>
      <Box sx={{ ml: 1 }}>
        {_DATA.currentData().map((item, i) => (
          <ProfileCommentItem
          key={i}
          contents={item.contents}
          date={item.writingTime}
          reviewId={item.reviewId}
        ></ProfileCommentItem>
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
