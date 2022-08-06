import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import CategorySelected from "../atom/CategorySelected";

const CategoryButton = styled(Button)(
  ({ selected }) => `
  color: ${setColorBySelected(selected)};
  width: 100%;
  font-size: 1rem;
  font-weight: bold;
  `,
);

function setThemeBySelected(selected) {
  return selected ? "primary" : "negative";
}

function setColorBySelected(selected) {
  return selected ? "#e37373" : "grey";
}

export default function CategorySelectButton(props) {
  return (
    <Box sx={{ width: 1 }}>
      <CategoryButton type={`${setThemeBySelected(props.selected)}`} selected={props.selected} onClick={props.onClick}>
        {props.category}
      </CategoryButton>
      <CategorySelected type={`${setThemeBySelected(props.selected)}`} sx={{ width: 1 }}></CategorySelected>
    </Box>
  );
}
