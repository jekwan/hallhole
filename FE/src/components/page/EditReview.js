import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

import TextStyle from "../atom/Text";
import CategoryDivider from "../atom/CategoryDivider";
import EditForm from "../organism/EditForm";
import { useParams } from "react-router-dom";

export default function EditReview() {
  const { id } = useParams();

  return (
    <Box sx={{ marginTop: 8 }}>
      <Box sx={{ width: "90%", margin: "auto", mt: 3 }}>
        <TextStyle variant="black" size="medium" weight="">
          ✍🏼 후기 수정
        </TextStyle>
        <CategoryDivider type="dark"></CategoryDivider>
        <TextStyle variant="black" size="small">
          {"관람한 공연에 대한 후기를 공유해주세요"}
        </TextStyle>
      </Box>
      {/* 리뷰 폼 */}
      <EditForm id={id}></EditForm>
    </Box>
  );
}
