import React from "react";
import { useState } from "react";
import { List } from "@mui/material";
import { Box } from "@mui/system";

import CategorySelectButton from "./CategorySelectButton";
import TextStyle from "../atom/Text";
import ProfileReviewItem from "./ProfileReviewItem";

// function getList(selected) {
//   if (selected === "review") {
//     return reviewList
//   } else if (selected === "comment") {
//     return commentList
//   } else if (selected === "reaction") {
//     return reactionList
//   }
// }

const ActivityCategory = [
  { name: '후기', selected: true, },
  { name: '댓글', selected: false, },
  { name: '리액션', selected: false, },
]

// const Categories = ({ ActivityCategory, onClick }) =>
// {ActivityCategory && ActivityCategory.map(
//     (category) =>
//       <CategorySelectButton key={category.name} category={category.name} selected={category.selected} onClick={onClick}></CategorySelectButton>
//   )}

const selectCategory = (e) => {
  e.preventDefault();
  // console.log(e.target.innerText)
  // const { key } = e.currentTarget.dataset;
  // console.log(e.currentTarget)
  // console.log(e.currentTarget.dataset)
  // MyActivityCategory[index].selected = !MyActivityCategory[index].selected;
}


export default function MyActivity(props) {
  return (
    <Box sx={{ width: "95%", marginY: 2, marginLeft: 2 }}>
      <Box sx={{ display: "flex" }}>
        {ActivityCategory.map(
          (category, i) =>
            <CategorySelectButton id={i} key={i} category={category.name} selected={category.selected} onClick={selectCategory}></CategorySelectButton>
        )}
      </Box>
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
  )
}