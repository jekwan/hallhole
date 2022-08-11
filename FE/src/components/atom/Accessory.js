import React from "react";

import { styled } from "@mui/system";

const Accessory = styled("img")`
  width: ${props => (props.size === "large" ? "108px" : "50px")};
  height: "auto";
  margin: 3%;
  src: ${props => props.src};
  onclick: ${props => props.onClick};
`;

export default Accessory;
