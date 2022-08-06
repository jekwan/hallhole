import React from "react";

import ReviewItem from "../molecule/ReviewItem";
import { Box } from "@mui/system";
import TextStyle from "../atom/Text";

const performanceReviewList = [
  { title: "너무너무 짱", date: "2022.06.12", star_eval: 4.5, user: "경원" },
  { title: "너무너무 짱", date: "2022.06.12", star_eval: 4.5, user: "경원" },
  { title: "너무너무 짱", date: "2022.06.12", star_eval: 4.5, user: "경원" },
  { title: "너무너무 짱", date: "2022.06.12", star_eval: 4.5, user: "경원" },
];

export default function ReviewList() {
  return (
    <Box sx={{ marginTop: 1}}>
      <TextStyle size="medium" variant="primary">관람 후기</TextStyle>
      {performanceReviewList.map((item, i) => (
        <ReviewItem
          key={i}
          title={item.title}
          written_date={item.date}
          star_eval={item.star_eval}
          user={item.user}
        ></ReviewItem>
      ))}
    </Box>
  );
}
