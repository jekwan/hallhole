import * as React from 'react';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';

const PointColor2 = {
  1: '#e37373',
  2: '#e06262',
};

const CustomButton = styled(ButtonUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 22px;
  background-color: ${PointColor2[1]};
  padding: 12px 24px;

  border-radius: 10px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  height: 45px;
  width: 150px;

  &:hover {
    background-color: ${PointColor2[2]};
  }

  &.${buttonUnstyledClasses.active} {
    background-color: ${PointColor2[1]};
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }


`;

export default function UnstyledButtonsSimple({children}) {
  return (
    <CustomButton>{children}</CustomButton>
  );
}
