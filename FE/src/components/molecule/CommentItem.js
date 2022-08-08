import React from "react"
import { Box } from "@mui/system"
import { CardHeader } from "@mui/material"

import ProfileImage from "../atom/ProfileImage"
import TextStyle from "../atom/Text"

export default function CommentItem(props) {
  // 댓글 유저의 프로필로 이동하는 함수
  function moveToCommentProfile(e) {
    e.preventDefault()
  }

  return(
    <Box>
      <CardHeader
      sx={{ padding: 0.5 }}
      avatar={<ProfileImage type="small" src="" />}
      title={<Box>
        <TextStyle size="medium" variant="black">
          {props.username}
        </TextStyle>
        <TextStyle size="small" variant="grey">
          {props.written_date}
        </TextStyle>
        <br></br>
        <TextStyle size="small" variant="grey">{props.content}</TextStyle>
        </Box>
      }
      onClick={moveToCommentProfile}
    ></CardHeader>
    </Box>
  )
}