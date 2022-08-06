import React from "react";
import { Box } from "@mui/system";
import ButtonStyle from "../atom/Button";

export default function SaveCancel(props) {
  // 취소 저장 버튼이 한 줄에 위치해있습니다.
  return (
      <Box sx={{ display:"flex", justifyContent:"center" }}> 
        <ButtonStyle size="medium" variant="grey">취소</ButtonStyle>
        <ButtonStyle size="medium" variant="primary">저장</ButtonStyle>
      </Box>
  );
}
