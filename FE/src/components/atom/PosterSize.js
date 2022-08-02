import React from "react";
import { styled } from "@mui/system";

const Image = styled("img")(
  ({ size, type }) => `
  width: ${getSizeBywidth(size)};
  height: ${getSizeByheight(size)};
  border: ${getBorder(type)};
  blurRadius : ${getBlur(type)};
`,
);

function getBorder(type) {
  switch (type) {
    case "outlined":
      return "1";
    default:
      return "0";
  }
}

function getSizeBywidth(size) {
  switch (size) {
    case "full":
      return "412px";
    case "large":
      return "300px";
    case "medium":
      return "180px";
    case "small":
      return "100px";
  }
}
function getSizeByheight(size) {
  switch (size) {
    case "full":
      return "548px";
    case "large":
      return "400px";
    case "medium":
      return "240px";
    case "small":
      return "134px";
  }
}
//blurRadius
function getBlur(type) {
  switch (type) {
    case "blur":
      return "3px";
    default:
      return "0";
  }
}

<PosterImage size="large" type="outlined"></PosterImage>;

export default function PosterImage(props) {
  /**
   * props
   *  - size : full/large/medium/small 존재
   *  - type: outlined = 외곽선 blur = 3px의 블러처리
   *  - src : 이미지 url
   *  - onClick : 클릭 시 이벤트
   */
  return <Image size={props.size} type={props.type} src={props.src} onClick={props.onClick}></Image>;
}
