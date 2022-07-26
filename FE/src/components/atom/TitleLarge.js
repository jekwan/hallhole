import * as React from 'react';
import styled from 'styled-components';

const  CustomText = styled.text`
font-family: IBM Plex Sans, sans-serif;
font-weight: bold;
font-size: 30px;
color: black;
`;

export default function UnStyledTextSimple({children}) {
  return (
    <CustomText>{children}</CustomText>
  );
}