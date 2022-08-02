import { ImageList, ImageListItem } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import TextStyle from "../atom/Text";
import CategoryDivider from "../atom/CategoryDivider";

const flexContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  padding: 0,
  whiteSpace: "nowrap",
  overflow: "auto",
};

export default function LikePerformances(props) {
  return (
    <Box sx={{ width: 1, marginY: 2, marginLeft: 1 }}>
      <TextStyle size="medium" variant="primary">
        좋아요 누른 공연
      </TextStyle>
      <CategoryDivider type="primary" />
      <Box>
        <ImageList style={flexContainer}>
          {props.likePerformances.map(item => (
            <ImageListItem key={item.id}>
              <img key={item.id} src={item.img} alt={item.title} style={{ width: 150 }} />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
}
