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

export default function Input(props) {
  /**
   * props
   *  - value : input에 바인딩 되는 값
   *  - size : { "large", "medium", "small" }
   *  - type : { "password", "email", "text", "number", ... }
   *  - color : { "primary", "secondary", "error", "disabled", "inherit", ... }
   *  - variant : { "standard(default)", "outlined" }
   *  - onChange : 입력 시 실행되는 함수
   *  - label : 추가 input 컴포넌트 안에 "label"을 이용하여 텍스트를 넣을 수 있다.
   */
  return (
    <Box>
      <StyledTextField
        value={props.value}
        size={props.size}
        type={props.type}
        color={props.color}
        label={props.label}
        variant={props.variant}
        onChange={props.onChange}
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
      return "standard";
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
