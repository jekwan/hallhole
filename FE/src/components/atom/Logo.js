import React from "react";

import { styled } from "@mui/system";

const Logo = styled("img")`
  width: ${props => (props.size === "large" ? "40vw" : props.size === "medium" ? "90px" : "20vw")};
  height: ${props => (props.size === "large" ? "20vw" : props.size === "medium" ? "45px" : "10vw")};
  src: ${props => props.src};
  onclick: ${props => props.onClick};
`;

export default Logo;
