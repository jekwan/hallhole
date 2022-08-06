import React from "react";

import { styled } from "@mui/system";

const sizeLarge = "175px";
const sizeSmall = "65px";

const Content = styled("div")(
  ({ size }) => `
    width: ${size === "large" ? sizeLarge : sizeSmall};
    height: ${size === "large" ? sizeLarge : sizeSmall};
    border-radius: 10px;


    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    &:hover {
      background-color: grey;
    }
  `,
);

const Image = styled("img")({
  borderRadius: 10,
  width: 48,
  height: 48,
  margin: "auto",
});

export default function ImageButton(props) {
  /**
   * props
   *  - size : "large" 또는 "small"
   *  - src : 이미지 url
   *  - text : 하단 텍스트
   *  - onClick : 클릭 시 이벤트
   */
  return (
    <Content size={props.size} onClick={props.onClick}>
      <Image src={props.src}></Image>
      <em>{props.text}</em>
    </Content>
  );
}
