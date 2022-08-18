import React, { useEffect, useState } from "react";

import { keyframes, styled, css } from "@mui/system";
import { Grid } from "@mui/material";

import { fetchImages } from "../../apis/performance";

const MarqueeAnimation = keyframes`
  from {
    transform: translate(0%, 0%);
  }
  to {
    transform: translate(0%, -50%);
  }
`;

const ScrollParent = styled(Grid)(
  ({}) => css`
    animation: ${MarqueeAnimation} 60s linear infinite;
  `,
);

const Poster = styled("img")`
  width: 100%;
  height: 100%;
  border-radius: 10%;
`;

function createChildren(items, cols) {
  const children = [];
  children.push(
    items.map(item => {
      return (
        <Grid item xs={12 / cols} key={item.img + "1"}>
          <Poster src={item.img} loading="lazy" />
        </Grid>
      );
    }),
  );
  children.push(
    items.map(item => {
      return (
        <Grid item xs={12 / cols} key={item.img + "2"}>
          <Poster src={item.img} loading="lazy" />
        </Grid>
      );
    }),
  );
  return children;
}

export default function PosterMarquee(props) {
  const [item, setItem] = useState([]);

  useEffect(() => {
    fetchImages(
      res => {
        const posters = res.data.map(item => {
          return {
            img: item,
          };
        });
        setItem(posters);
      },
      err => console.log(err),
    );
  }, []);
  return (
    <ScrollParent container rowSpacing={1} columnSpacing={1}>
      {createChildren(item, props.cols)}
    </ScrollParent>
  );
}
