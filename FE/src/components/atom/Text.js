import React from "react";
import { styled } from "@mui/system";

const CustomText = styled("span")(
  ({ size, variant }) => `
  color: ${getColor(variant)};
  font-size: ${getSize(size)};
  margin: 3px;
  font-weight: bold;
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
  }
}

function getColor(variant) {
  switch (variant) {
    case "primary":
      return "#e37373";
    case "black":
      return "black";
    case "white":
      return "white";
  }
}

export default function TextStyle({ variant, children, size }) {
  return (
    //  텍스트는 크게 large, medium, small 사이즈로 구분되며
    // 색상은 primary, black, white 로 구분됩니다.
    // 두가지 모두 적용시켜주셔야 합니다.
    <CustomText variant={variant} size={size}>
      {children}
    </CustomText>
  );
}
