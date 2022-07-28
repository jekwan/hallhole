import * as React from 'react';
import Divider from '@mui/material/Divider';

const primary = {
  width: '25%',
  height: 5,
  maxWidth: 360,
  bgcolor: '#e37373',
};

const negative = {
    width: '25%',
    height: 5,
    maxWidth: 360,
    bgcolor: '#E1E1E1',
  };
  
  const dark = {
    width: '25%',
    height: 5,
    maxWidth: 360,
    bgcolor: '#000000',
  };
  

export default function categorySelected(props) {
    if (props.type === "primary") {
      return <Divider sx={primary}></Divider>
    }else if(props.type === "negative") {
      return <Divider sx={negative}></Divider>
    }else if(props.type === "dark") {
      return <Divider sx={dark}></Divider>
    };
}
