import React from "react";

import { styled } from "@mui/system";
import { Box } from "@mui/material";

import Text from "../atom/Text";

const Background = styled(Box)`
  display: inline-block;
  width: 80vw;
  height: 5vh;
  border-radius: 2.5vh;
  background-color: ${props => props.theme.palette.base.black};
  z-index: -10;
`;

const Toggled = styled(Box)`
  position: relative;
  width: 40vw;
  height: 5vh;
  border-radius: 2.5vh;
  background-color: ${props => props.theme.palette.primary.main};
  z-index: 0;

  left: ${({ toggle }) => (toggle == "off" ? "0" : "40vw")};
  transition: all 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

const TextBox = styled(Box)`
  position: relative;
  width: 80vw;
  height: 5vh;
  line-height: 5vh;

  top: -100%;

  display: flex;
  justify-content: space-around;

  z-index: 10;
`;

export default function ToggleButton(props) {
  const [toggle, setToggle] = React.useState("off");

  function onClickLeft() {
    if (props && props.onClickLeft) props.onClickLeft();
    setToggle("off");
  }
  function onClickRight() {
    if (props && props.onClickRight) props.onClickRight();
    setToggle("on");
  }

  return (
    <Background>
      <Toggled toggle={toggle} />
      <TextBox>
        <Box onClick={onClickLeft}>
          <Text size="medium" variant="white">
            {props.textLeft}
          </Text>
        </Box>
        <Box onClick={onClickRight}>
          <Text size="medium" variant="white">
            {props.textRight}
          </Text>
        </Box>
      </TextBox>
    </Background>
  );
}
