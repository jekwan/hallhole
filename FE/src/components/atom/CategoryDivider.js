import * as React from "react";
import Divider from "@mui/material/Divider";

const primary = {
  width: "100%",
  height: 3,
  maxWidth: "100vw",
  bgcolor: "#e37373",
};

const negative = {
  width: "100%",
  height: 3,
  maxWidth: "100vw",
  bgcolor: "#E1E1E1",
};

const dark = {
  width: "100%",
  height: 3,
  maxWidth: "100vw",
  bgcolor: "#000000",
};

const thinDark = {
  width: "100%",
  height: 1,
  maxWidth: "100vw",
  bgcolor: "#000000",
};

function getStyle(type) {
  switch (type) {
    case "primary":
      return primary;
    case "negative":
      return negative;
    case "dark":
      return dark;
    case "thinDark":
      return thinDark;
    default:
      return primary;
  }
}

export default function CategoryDivider(props) {
  /* type = {option}
  <option>
  primary  핑크색 굵은 구분선
  negative 회색 굵은 구분선
  dark 검은색 굵은 구분선
  thindark 검은색 얇은 구분선 */
  return <Divider sx={getStyle(props.type)}></Divider>;
}
