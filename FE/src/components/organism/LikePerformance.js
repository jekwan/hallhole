import { ImageList, ImageListItem, Box } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

import Text from "../atom/Text";
import CategoryDivider from "../atom/CategoryDivider";

const flexContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  whiteSpace: "nowrap",
};

const Content = styled(Box)`
  text-align: center;
`;

export default function LikePerformances(props) {
  return (
    <Content>
      <Text size="medium" variant="primary">
        좋아요 누른 공연
      </Text>
      <CategoryDivider type="primary" variant="middle" />
      <Box>
        <ImageList style={flexContainer}>
          {props.likePerformances.map(item => (
            <ImageListItem key={item.id}>
              <img key={item.id} src={item.img} alt={item.title} style={{ width: 150 }} />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Content>
  );
}
