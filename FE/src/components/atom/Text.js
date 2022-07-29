import React from "react";
import { styled } from "@mui/system";

// Text를 사용할 때 size와variant를 지정해 줘야하며
// 사이즈는 large, medium, small 있으며 각각 30px, 22px, 16px 크기이다.
// 색상은 primary, white, black 이다.

const CustomText = styled(`text`)({
  color: "black",
  fontFamily: "Helvetica Neue",
});

export default function TextStyle({ children, size, variant }) {
  if (size === "large") {
    if (variant === "primary") {
      return <CustomText sx={{ fontSize: 30, fontWeight: "bold", color: "primary.main" }}>{children}</CustomText>;
    } else if (variant === "white") {
      return <CustomText sx={{ fontSize: 30, fontWeight: "bold", color: "white" }}>{children}</CustomText>;
    } else {
      return <CustomText sx={{ fontSize: 30, fontWeight: "bold", color: "black" }}>{children}</CustomText>;
    }
  } else if (size === "medium") {
    if (variant === "primary") {
      return <CustomText sx={{ fontSize: 22, fontWeight: "medium", color: "primary.main" }}>{children}</CustomText>;
    } else if (variant === "white") {
      return <CustomText sx={{ fontSize: 22, fontWeight: "medium", color: "white" }}>{children}</CustomText>;
    } else {
      return <CustomText sx={{ fontSize: 22, fontWeight: "medium", color: "black" }}>{children}</CustomText>;
    }
  } else if (size === "small") {
    if (variant === "primary") {
      return <CustomText sx={{ fontSize: 16, fontWeight: "medium", color: "primary.main" }}>{children}</CustomText>;
    } else if (variant === "white") {
      return <CustomText sx={{ fontSize: 16, fontWeight: "medium", color: "white" }}>{children}</CustomText>;
    } else {
      return <CustomText sx={{ fontSize: 16, fontWeight: "medium", color: "black" }}>{children}</CustomText>;
    }
  } else {
    return <CustomText>{children}</CustomText>;
  }
}
