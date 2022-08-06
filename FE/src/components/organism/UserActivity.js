import { Box } from "@mui/system";
import React from "react";

import ProfileReviewItem from "../molecule/ProfileReviewItem";
import TextStyle from "../atom/Text";
import CategoryDivider from "../atom/CategoryDivider";
import { List } from "@mui/material";

export default function UserActivity(props) {
  return (
    <Box sx={{ width: 1, marginY: 2, marginLeft: 2 }}>
      <TextStyle size="medium" variant="primary">
        {props.username}님이 작성한 후기
      </TextStyle>
      <CategoryDivider type="primary" />
      <List>
        {props.reviews.map(item => (
          <ProfileReviewItem
            key={item.id}
            title={item.title}
            date={item.date}
            star_eval={item.star_eval}
            performance_name={item.performance_name}
          ></ProfileReviewItem>
        ))}
      </List>
    </Box>
  );
}
