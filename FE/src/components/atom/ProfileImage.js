import React from "react";

import { styled } from "@mui/system";

import { Avatar } from "@mui/material";

const Image = styled(Avatar)(
  ({ type }) => `
  width: ${getSizeByType(type)};
  height: ${getSizeByType(type)};
  border-radius: ${getBorderRadiusByType(type)};
  margin: 10px;
`,
);

function getBorderRadiusByType(type) {
  switch (type) {
    case "thumb":
      return "50% 50% 0% 0%";
    default:
      return "50%";
  }
}

function getSizeByType(type) {
  switch (type) {
    case "large":
      return "150px";
    case "thumb":
      return "55px";
    case "small":
      return "55px";
  }
}

export default function ProfileImage(props) {
  /**
   * props
   *  - type : "large" 또는 "small" 또는 "thumb"
   *  - src : 이미지 url
   *  - onClick : 클릭 시 이벤트
   */
  return <Image type={props.type} src={props.src} onClick={props.onClick}></Image>;
}
