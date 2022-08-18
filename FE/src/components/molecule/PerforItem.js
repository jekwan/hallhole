import * as React from "react";

import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import PosterSize from "../atom/PosterSize";
import TextStyle from "../atom/Text";

export default function PerfoItem({ i, poster, facility_name, id, startDate, endDate, name }) {
  return (
    <Box key={i}>
      <Box sx={{ boxShadow: 5, width: "90vw", height: "140px", textAlign: "center", marginX: "auto", marginY: 2 }}>
        {/* 공연 상세페이지로 이동하기 */}
        <Link to={`/performancedetail/${id}`} style={{ textDecoration: "none" }}>
          <Box sx={{ float: "left", marginX: "1px", marginY: "3px", width: "25vw" }}>
            <PosterSize src={poster} size="small"></PosterSize>
          </Box>
          <Box sx={{ float: "right", width: "62vw", marginTop: 2.2 }}>
            <TextStyle size="small" weight="bold" variant="black">
              {name}
            </TextStyle>
            <Box sx={{ marginTop: 1 }}>
              <TextStyle variant="black" size="smallest">
                📍 {facility_name}
              </TextStyle>
              <br />
              <TextStyle variant="primary" size="smallest">
                오픈 기간
              </TextStyle>
              <br />
              <TextStyle variant="black" size="smallest">
                {startDate.slice(0, -9)}
              </TextStyle>
              <TextStyle variant="black" size="smallest">
                ~
              </TextStyle>
              <TextStyle variant="black" size="smallest">
                {endDate.slice(5, -9)}
              </TextStyle>
            </Box>
          </Box>
        </Link>
      </Box>
    </Box>)
}