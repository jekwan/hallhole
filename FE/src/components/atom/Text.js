import React from "react";
import { styled } from "@mui/system";

const CustomText = styled("span")(
  ({ size, variant, weight }) => `
  color: ${getColor(variant)};
  font-size: ${getSize(size)};
  margin: 0;
  padding: 0;
  font-family: ${getWeight(weight)};
  `,
);

function getSize(size) {
  switch (size) {
    case "large":
      return "30px";
    case "medium":
      return "22px";
    case "small":
      return "16px";
    case "smallest":
      return "12px";
  }
}

function getColor(variant) {
  switch (variant) {
    case "primary":
      return "#e37373";
    case "black":
      return "black";
    case "gray":
    case "grey":
      return "grey";
    case "white":
      return "white";
    default:
      return "black";
  }
}

function getWeight(weight) {
  switch (weight) {
    case "bold":
      return "gmarketSansBold";
    case "normal":
      return "gmarketSansMedium";
    case "lighter":
      return "gmarketSansLight";
    default:
      return "gmarketSansMedium";
  }
}

export default function TextStyle({ variant, children, size, weight }) {
  return (
    //  텍스트는 크게 large, medium, small 사이즈로 구분되며
    // 색상은 primary, black, white 로 구분됩니다.
    // 두가지 모두 적용시켜주셔야 합니다.
    <CustomText variant={variant} size={size} weight={weight}>
      {children}
    </CustomText>
  );
}
