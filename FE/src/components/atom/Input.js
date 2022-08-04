import React from "react";

import { TextField } from "@mui/material";

export default function Input(props) {
  /**
   * props
   *  - size : "large" 또는 "medium" 또는 "small"
   *  - onClick : 클릭 시 이벤트
   */
  if (props.size === "large") {
    return (
      <TextField sx={{ m: 0.75, width: "75%" }} variant="outlined" color="primary" onKeyPress={props.onKeyPress} />
    );
  } else if (props.size === "medium") {
    return (
      <TextField sx={{ m: 0.75, width: "50%" }} variant="outlined" color="primary" onKeyPress={props.onKeyPress} />
    );
  } else if (props.size === "sign") {
    return (
      <TextField
        sx={{ m: 0.75, width: "380px", backgroundColor: "white" }}
        label={" Enter Email "}
        variant="standard"
        color="primary"
        onKeyPress={props.onKeyPress}
      />
    );
  } else {
    return (
      <TextField sx={{ m: 0.75, width: "25%" }} variant="outlined" color="primary" onKeyPress={props.onKeyPress} />
    );
  }
}
