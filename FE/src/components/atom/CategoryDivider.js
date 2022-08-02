import * as React from 'react';
import Divider from '@mui/material/Divider';

const primary = {
  width: '100%',
  height: 3,
  maxWidth: 360,
  bgcolor: '#e37373',
};

const negative = {
  width: '100%',
  height: 3,
  maxWidth: 360,
  bgcolor: '#E1E1E1',
};

const dark = {
  width: '100%',
  height: 3,
  maxWidth: 360,
  bgcolor: '#000000',
};

const thinDark = {
  width: '100%',
  height: 1,
  maxWidth: 360,
  bgcolor: '#000000',
}

export default function categoryDivider(props) {
  /* type = {option}
  <option>
  primary  핑크색 굵은 구분선
  negative 회색 굵은 구분선
  dark 검은색 굵은 구분선
  thindark 검은색 얇은 구분선 */
    if (props.type === "primary") {
      return <Divider sx={primary}></Divider>
    }else if(props.type === "negative") {
      return <Divider sx={negative}></Divider>
    }else if(props.type === "dark") {
      return <Divider sx={dark}></Divider>
    }else if(props.type === "thinDark") {
      return <Divider sx={thinDark}></Divider>
    };
}
