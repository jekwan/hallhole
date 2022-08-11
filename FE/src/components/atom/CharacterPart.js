import React from "react";

import { styled } from "@mui/system";

const Partition = styled("img")`
  width: ${props => (props.size === "large" ? "108px" : "50px")};
  height: "auto";
  src: ${props => props.src};
`;

export default Partition;
