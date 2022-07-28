import React from "react";
import Button from "@mui/material/Button";

//  버튼은 크게 large, medium, small 사이즈로 구분되며
// 색상은 primary, negative를 선택하게 된다.
// 버튼에 sx를 적용하기 위해선 크기와 색상을 전부 지정해줘야하며
// small 사이즈는 variant를 따로 지정하지 않았다.

export default function ButtonStyle({ children, size, variant }) {
  if (size === "large" && variant === "primary") {
    return (
      <Button
        sx={{
          color: "black",
          bgcolor: "primary.main",
          borderRadius: 2,
          width: 380,
          height: 60,
          m: 0.7,
          p: 2,
          boxShadow: 1,
          fontWeight: "bold",

          "&:hover": {
            color: "white",
            backgroundColor: "secondary.main",
          },
        }}
      >
        {children}
      </Button>
    );
    // 반복
  } else if (size === "medium" && variant === "primary") {
    return (
      <Button
        sx={{
          color: "black",
          bgcolor: "primary.main",
          borderRadius: 2,
          width: 150,
          height: 45,
          m: 0.7,
          p: 2,
          boxShadow: 1,
          fontWeight: "bold",
          "&:hover": {
            color: "white",
            backgroundColor: "secondary.main",
          },
        }}
      >
        {children}
      </Button>
    );
    // 반복
  } else if (size === "small") {
    return (
      <Button
        sx={{
          color: "black",
          bgcolor: "primary.main",
          borderRadius: 2,
          width: 96,
          height: 50,
          m: 0.7,
          p: 2,
          boxShadow: 1,
          fontWeight: "bold",
          "&:hover": {
            color: "white",
            backgroundColor: "secondary.main",
          },
        }}
      >
        {children}
      </Button>
    );
  } else if (size === "large" && variant === "negative") {
    return (
      <Button
        sx={{
          color: "black",
          bgcolor: "negative.main",
          borderRadius: 2,
          width: 380,
          height: 60,
          m: 0.7,
          p: 2,
          boxShadow: 1,
          fontWeight: "bold",

          "&:hover": {
            color: "white",
            backgroundColor: "negative.main",
          },
        }}
      >
        {children}
      </Button>
    );
  } else if (size === "medium" && variant === "negative") {
    return (
      <Button
        sx={{
          color: "black",
          bgcolor: "negative.main",
          borderRadius: 2,
          width: 150,
          height: 45,
          m: 0.7,
          p: 2,
          boxShadow: 1,
          fontWeight: "bold",

          "&:hover": {
            color: "white",
            backgroundColor: "negative.main",
          },
        }}
      >
        {children}
      </Button>
    );
  }
}
