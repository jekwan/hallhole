import React from "react";

import { styled } from "@mui/system";

const Logo = styled("img")`
  width: ${props => (props.size === "large" ? "216px" : "103px")};
  height: ${props => (props.size === "large" ? "115px" : "54px")};
  src: ${props => props.src};
  onclick: ${props => props.onClick};
`;

export default Logo;
