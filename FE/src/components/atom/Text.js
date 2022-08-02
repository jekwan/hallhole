import React from "react";
import { styled } from "@mui/system";

const CustomText = styled(`text`)({
  color: "black",
  fontFamily: "Helvetica Neue",
});

export default function TextStyle({ children, variant }) {
  // 색상은 primary, white, black 이며
  // primary, white는 variant 값을 적용해야 하며
  // 없으면 black으로 색상이 지정된다.
  if (variant === "primary") {
    return <CustomText sx={{ fontWeight: "bold", color: "primary.main" }}>{children}</CustomText>;
  } else if (variant === "white") {
    return <CustomText sx={{ fontWeight: "bold", color: "white" }}>{children}</CustomText>;
  } else {
    return <CustomText sx={{ fontWeight: "bold", color: "black" }}>{children}</CustomText>;
  }
}
