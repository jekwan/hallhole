import React from "react";
import { Box } from "@mui/system";

import TextStyle from "../atom/Text";

export default function ProfileCommentItem({ contents, date }) {
  function changeStrToDate(str) {
    if (str) {
      return str.slice(0, 10);
    }
  }

  return (
    <Box sx={{ display: "flex", mt: 2, mx: 1, justifyContent: "space-between", alignItems: "center" }}>
      <Box sx={{ maxWidth: "70%"}}>
        <TextStyle size="small">{contents}</TextStyle>
      </Box>
      <TextStyle size="small" variant="grey">
        {changeStrToDate(date)}
      </TextStyle>
    </Box>
  );
}
