import React from "react";
import { styled } from "@mui/system";

// Text를 사용할 때 size를 사용해 줘야하며
// 사이즈는 large, medium, small 있으며 각각 30px, 22px, 16px 크기이다.

const CustomText = styled(`text`)({
  color: "black",
  fontFamily: "Helvetica Neue",
});

export default function TextStyle({ children, size }) {
  if (size === "large") {
    return <CustomText sx={{ fontSize: 30, fontWeight: "bold" }}>{children}</CustomText>;
  } else if (size === "medium") {
    return <CustomText sx={{ fontSize: 22, fontWeight: "medium" }}>{children}</CustomText>;
  } else if (size === "small") {
    return <CustomText sx={{ fontSize: 16, fontWeight: "medium" }}>{children}</CustomText>;
  } else {
    return <CustomText>{children}</CustomText>;
  }
}
