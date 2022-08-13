import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";

const style = {
  m: 0.7,
  p: 2,
  borderRadius: 2,
  boxShadow: 1,
  fontWeight: "bold",
};

const ButtonCheck = styled(Button)(
  ({ size, variant, color }) => `
  margin: 3px;
  width: ${getSizeWidth(size)};
  height: ${getSizeHeight(size)};
  background-color: ${getBackgroundColor(variant)};
  &: hover{
    background-color: ${getHoverColor(variant)};
  };
  text-align: center;
  color: ${getColor(color)};
  font-family: "gmarketSansMedium"
  `,
);

function getColor(color) {
  switch (color) {
    case "white":
      return "white";
    case "black":
      return "black";
    default:
      return "white";
  }
}

function getBackgroundColor(variant) {
  switch (variant) {
    case "primary":
      return "#e37373";
    case "grey":
      return "#808080";
    default:
      return "#e37373";
  }
}

function getHoverColor(variant) {
  switch (variant) {
    case "primary":
      return "#e38f8f";
    case "grey":
      return "#979797";
    default:
      return "#e38f8f";
  }
}

function getSizeWidth(size) {
  switch (size) {
    case "large":
      return "90vw";
    case "medium":
      return "75vw";
    case "small":
      return "50vw";
    case "smaller":
      return "20vw";
    case "smallest":
      return "5vw";
    case "none":
      return "unset"
    default:
      return "75vw";
  }
}

function getSizeHeight(size) {
  switch (size) {
    case "large":
      return "6vh";
    case "medium":
      return "5vh";
    case "small":
      return "4vh";
    case "smaller":
      return "4vh";
    case "smallest":
      return "5vh";
    default:
      return "5vh";
  }
}

export default function ButtonStyle({ children, size, variant, onClick, color }) {
  return (
    //  버튼은 크게 large, medium, small 사이즈로 구분되며
    // 색상은 현재 primary 를 선택하게 된다.(추후 색상 추가할 수 있다.)
    <ButtonCheck sx={style} size={size} variant={variant} onClick={onClick} color={color}>
      {children}
    </ButtonCheck>
  );
}
