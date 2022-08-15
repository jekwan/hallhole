import React from 'react';
import Box from '@mui/material/Box';
import TextStyle from '../atom/Text'


export default function ProfileReviewItem(props) {
  function changeStrToDate(str) {
    if (str) {
      return str.slice(0, 10);
    }
  }

  return (
    <Box sx={{ width: 1, marginY: 1 }}>
      <div>
        <TextStyle size="medium" variant="black" sx={{ fontWeight: "bold", mx: 5 }}>{props.title}</TextStyle>
      </div>
      <div>
        <TextStyle size="small" variant="grey">{props.star_eval} | {changeStrToDate(props.writing_time)}</TextStyle>
      </div>
    </Box>
  )
}