import React from "react";

import { styled } from "@mui/system";

const Image = styled("img")(
  ({ size }) => `
    width: ${size === "large" ? "216px" : "103px"};
    height: ${size === "large" ? "115px" : "54px"};
    margin: 10px;
  `,
);

export default function Logo(props) {
  /**
   * props
   *  - size : "large" 또는 "small"
   *  - src : 이미지 url
   *  - onClick : 클릭 시 이벤트
   */
  return <Image size={props.size} src="logo.png" onClick={props.onClick}></Image>;
}
