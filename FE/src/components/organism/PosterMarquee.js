import React from "react";

import { keyframes, styled, css } from "@mui/system";
import { Grid } from "@mui/material";

const MarqueeAnimation = keyframes`
  from {
    transform: translate(0%, 0%);
  }
  to {
    transform: translate(0%, -500%);
  }
`;
const ScrollChild = styled(Grid)(
  ({}) => css`
    animation: ${MarqueeAnimation} 60s linear infinite;
  `,
);

const Poster = styled("img")`
  width: 100%;
  border-radius: 10%;
`;

function createChildren(items, cols) {
  const children = [];
  children.push(
    items.map(item => {
      return (
        <ScrollChild item xs={12 / cols} key={item.img + "1"}>
          <Poster src={item.img} alt={item.title} loading="lazy" />
        </ScrollChild>
      );
    }),
  );
  children.push(
    items.map(item => {
      return (
        <ScrollChild item xs={12 / cols} key={item.img + "2"}>
          <Poster src={item.img} alt={item.title} loading="lazy" />
        </ScrollChild>
      );
    }),
  );
  return children;
}

export default function PosterMarquee(props) {
  return (
    <Grid container rowSpacing={1} columnSpacing={1}>
      {createChildren(props.items, props.cols)}
    </Grid>
  );
}
