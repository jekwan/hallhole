import React from "react";

import { styled } from "@mui/system";
import { Box, TextField } from "@mui/material";

const StyledTextField = styled(TextField)(
  ({ variant, color, label, type, size }) => `
    color: ${color};
    label: ${label};
    variant: ${getVariant(variant)};
    type: ${type};

    margin: 0;
    padding: 0;

    width: ${getWidth(size)};
    background-color: white;
    border-radius: 8px;
`,
);

export default function Input({
  value,
  size = "medium",
  type = "text",
  variant = "outlined",
  color = "primary",
  label = "",
  onChange = () => {},
  errorMessage = "",
}) {
  /**
   * props
   *  - value : input에 바인딩 되는 값
   *  - size : { "large", "medium", "small" }
   *  - type : { "password", "email", "text", "number", ... }
   *  - color : { "primary", "secondary", "error", "disabled", "inherit", ... }
   *  - variant : { "outlined(default)", "standard", "filled" }
   *  - onChange : 입력 시 실행되는 함수
   *  - label : 추가 input 컴포넌트 안에 "label"을 이용하여 텍스트를 넣을 수 있다.
   *  - errorMessage : 에러 메세지를 넣을 수 있다.
   */
  return (
    <Box>
      <StyledTextField
        value={value}
        size={size}
        type={type}
        color={color}
        label={label}
        variant={variant}
        onChange={onChange}
        error={errorMessage.length > 0 ? true : false}
        helperText={errorMessage}
      />
    </Box>
  );
}

function getVariant(variant) {
  switch (variant) {
    case "outlined":
      return "outlined";
    case "filled":
      return "filled";
    default:
      return "filled";
  }
}

function getWidth(size) {
  switch (size) {
    case "large":
      return "75vw";
    case "medium":
      return "50vw";
    case "small":
      return "25vw";
    default:
      return "50vw";
  }
}

function getHeight(size) {
  switch (size) {
    case "large":
      return "5vh";
    case "medium":
      return "5vh";
    case "small":
      return "5vh";
    default:
      return "5vh";
  }
}
