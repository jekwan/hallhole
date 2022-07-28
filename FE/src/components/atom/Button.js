import React from "react";
import Button from "@mui/material/Button";

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
