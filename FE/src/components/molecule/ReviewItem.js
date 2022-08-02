import React from 'react';
import Box from '@mui/material/Box';
import TextStyle from '../atom/Text'


export default function ReviewItem (props) {
  return (
    <Box sx={{ width: 1 , marginY : 1 }}>
      <div>
        <TextStyle size="medium" variant="black" sx={{ fontWeight: "bold", mx: 5 }}>[{props.performance_name}] {props.title}</TextStyle>
      </div>
      <div>
        <TextStyle size="small" variant="black">{props.star_eval} | {props.date}</TextStyle>
      </div>
    </Box>
  )
}