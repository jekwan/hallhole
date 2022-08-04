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
  width: ${getSizeWidth(size)};
  height: ${getSizeHeight(size)};
  background-color: ${getBackgroundColor(variant)};
  &: hover{
    background-color: ${getHoverColor(variant)};
  };
  text-align: center;
  color: ${getColor(color)};
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
  }
}

function getHoverColor(variant) {
  switch (variant) {
    case "primary":
      return "#e38f8f";
  }
}

function getSizeWidth(size) {
  switch (size) {
    case "large":
      return "380px";
    case "medium":
      return "150px";
    case "small":
      return "96px";
  }
}

function getSizeHeight(size) {
  switch (size) {
    case "large":
      return "60px";
    case "medium":
      return "45px";
    case "small":
      return "50px";
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
