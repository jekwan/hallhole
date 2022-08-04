import React from "react";

import { TextField } from "@mui/material";

export default function Input(props) {
  /**
   * props
   *  - size : "large" 또는 "medium" 또는 "small"
   *  - onClick : 클릭 시 이벤트
   *  - label : 추가 input 컴포넌트 안에 "label"을 이용하여 텍스트를 넣을 수 있다.
   */
  if (props.size === "large") {
    return (
      <TextField
        sx={{ m: 0.75, width: "75%" }}
        variant="outlined"
        color="primary"
        onKeyPress={props.onKeyPress}
        label={props.label}
      />
    );
  } else if (props.size === "medium") {
    return (
      <TextField
        sx={{ m: 0.75, width: "50%" }}
        variant="outlined"
        color="primary"
        onKeyPress={props.onKeyPress}
        label={props.label}
      />
    );
  } else if (props.size === "sign") {
    return (
      <TextField
        sx={{ m: 0.75, width: "380px", backgroundColor: "white" }}
        label={props.label}
        variant="standard"
        color="primary"
        onKeyPress={props.onKeyPress}
      />
    );
  } else {
    return (
      <TextField
        sx={{ m: 0.75, width: "25%" }}
        variant="outlined"
        color="primary"
        onKeyPress={props.onKeyPress}
        label={props.label}
      />
    );
  }
}
