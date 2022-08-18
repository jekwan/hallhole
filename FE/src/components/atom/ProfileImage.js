import React from "react";

import { styled } from "@mui/system";

import { Avatar } from "@mui/material";

const Image = styled(Avatar)(
  ({ type }) => `
  width: ${getSizeByType(type)};
  height: ${getSizeByType(type)};
  border-radius: ${getBorderRadiusByType(type)};
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
      return "45px";
    case "small":
      return "55px";
  }
}

export default function ProfileImage({ type, onClick, char, acc }) {
  const imgUrl = !!char && !!acc ? `/${char}_${acc}.png` : "/0_0.png";
  /**
   * props
   *  - type : "large" 또는 "small" 또는 "thumb"
   *  - onClick : 클릭 시 이벤트
   *  - char : 캐릭터 색상 정보
   *  - acc : 악세서리 정보
   */
  return <Image type={type} src={imgUrl} onClick={onClick}></Image>;
}
