import React, { useEffect } from "react";

import { styled } from "@mui/system";
import { useTheme } from "@mui/material";

const ModalDiv = styled("div")`
  position: fixed;
  top: ${props => (props.toggle == "on" ? props.openheight : props.closeheight)};
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  z-index: 500;
  border-radius: ${props => props.borderradius};
  box-shadow: -1px -1px 1px 1px rgba(0, 0, 0, 0.1);

  background-color: ${props => props.backgroundcolor};
  transition: all 600ms cubic-bezier(0.86, 0, 0.07, 1);
`;

/**
 * props
 *  - toggle : "on" or "off"
 *  - modalOn : function to call when toggle is on
 *  - modalOff : function to call when toggle is off
 *  - backgroundcolor : background color of the modal
 *  - borderRadius : border radius of the modal
 *  - openHeight : height of the modal when opened( 0 ~ 100vh, default: "0")
 *  - closeHeight : height of the modal when opened( 0 ~ 100vh, default: "0")
 */
export default function Modal({
  toggle,
  modalOn,
  modalOff,
  backgroundcolor,
  borderRadius = "0",
  openHeight = "0",
  closeHeight = "105vh",
  children,
}) {
  const theme = useTheme();

  function onToggleChange(on, off) {
    if (toggle === "on") {
      on && on();
      document.body.style.overflow = "hidden";
    } else {
      off && off();
      document.body.style.overflow = "unset";
    }
  }

  function getBackgroundColor() {
    switch (backgroundcolor) {
      case "white":
        return theme.palette.base.white;
      default:
        return theme.palette.base.blackDim;
    }
  }

  useEffect(() => {
    onToggleChange(modalOn, modalOff);
  }, [toggle]);

  return (
    <ModalDiv
      toggle={toggle}
      openheight={openHeight}
      closeheight={closeHeight}
      backgroundcolor={getBackgroundColor()}
      borderradius={borderRadius}
    >
      {children}
    </ModalDiv>
  );
}
