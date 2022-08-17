import { ImageList, ImageListItem, Box } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";

import Text from "../atom/Text";
import CategoryDivider from "../atom/CategoryDivider";

import { mostLikedPerformance } from "../../apis/performanceLike";
import { Link } from "react-router-dom";

const flexContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  whiteSpace: "nowrap",
};

const Content = styled(Box)``;

export default function LikePerformances() {
  const [famousPerformanceList, setFamousPerformanceList] = useState([]);

  useEffect(() => {
    mostLikedPerformance(10, getLikePerformanceRankSuccess, getLikePerformanceRankFail);
  }, []);

  function getLikePerformanceRankSuccess(res) {
    setFamousPerformanceList(res.data);
  }

  function getLikePerformanceRankFail(err) {}
  return (
    <Box sx={{ mt: 2, mx: 2 }}>
      <Content>
        <Box
          sx={{
            textAlign: "left",
          }}
        >
          <Text size="large" variant="black">
          🔥 인기 공연
          </Text>
        <CategoryDivider type="dark" variant="middle"/>
        </Box>
        <Box>
          <ImageList style={flexContainer}>
            {famousPerformanceList.map(item => (
              <ImageListItem key={item.id}>
                <Link to={`/performancedetail/${item.id}`}>
                  <img
                    key={item.id}
                    src={item.poster}
                    alt={item.title}
                    style={{ width: 110, height: 150, borderRadius: 5 }}
                  />
                </Link>
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Content>
    </Box>
  );
}
