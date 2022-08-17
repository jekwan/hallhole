import React, { useEffect, useState } from "react";
import usePagination from "../molecule/SetPaginationData";
import { Pagination } from "@mui/material";

import { Box } from "@mui/system";
import PerfoItem from "./PerforItem";

export default function LikePerfoPagination({ likePerformanceList }) {
  let [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const count = Math.ceil(likePerformanceList.length / PER_PAGE);
  const _DATA = usePagination(likePerformanceList, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <Box>
      <Box>
        {_DATA.currentData().map((item, i) => (
          <PerfoItem
          key={i}
          poster={item.poster}
          facility_name={item.facility_name}
          startDate={item.startDate}
          endDate={item.endDate}
          name={item.name}
          id={item.id}
          />
        ))}
      </Box>
      <Box sx={{ width: "100%", margin: "auto", my: 2 }}>
        <Pagination sx={{ display: "flex", justifyContent: "center" }} size="small" color="primary" shape="rounded" page={page} count={count} onChange={handleChange} />
      </Box>
    </Box>
  );
}
