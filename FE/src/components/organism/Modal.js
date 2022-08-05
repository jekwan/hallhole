import { styled } from "@mui/system";

const ModalDiv = styled("div")`
  position: fixed;
  top: ${props => (props.toggle == "on" ? "0" : "100%")};
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;

  background-color: ${props => props.theme.palette.base.blackDim};
  transition: all 600ms cubic-bezier(0.86, 0, 0.07, 1);
`;

/**
 * props
 *  - toggle : "on" or "off"
 */
export default ModalDiv;
