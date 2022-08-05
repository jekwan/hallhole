import React from "react";
import { Box } from "@mui/system";
import CharacterProfile from "../molecule/CharacterProfile";
import ProfileEdit from "../molecule/ProfileEdit"
import ButtonStyle from "../atom/Button";
import TextStyle from "../atom/Text";

export default function EditProfile(props) {
  // 저장, 취소, 비밀번호 변경, 탈퇴하기 버튼 구성하기
  return (
    <Box>
      <CharacterProfile></CharacterProfile>
      <form>
        <ProfileEdit></ProfileEdit>
      <Box sx={{ m:3 }}>
        <Box sx={{ display: "flex", justifyContent: 'space-evenly', mb:2 }}>
          <TextStyle size="small" variant="black" onClick>비밀번호 변경하기</TextStyle>
          <TextStyle size="small" variant="red" onClick>회원 탈퇴</TextStyle>
        </Box>
        <ButtonStyle size="medium" variant="grey">취소</ButtonStyle>
        <ButtonStyle size="medium" variant="primary">저장</ButtonStyle>
      </Box>  
      </form>
    </Box>  
  );
}
