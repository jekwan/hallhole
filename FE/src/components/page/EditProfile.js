import React from "react";
import { Box } from "@mui/system";
import CharacterProfile from "../molecule/CharacterProfile";
import ProfileEdit from "../molecule/ProfileEdit"
import ButtonStyle from "../atom/Button";
import TextStyle from "../atom/Text";

export default function EditProfile(props) {
  // 추후 작업 - 비밀번호 변경, 회원 탈퇴 위치 재지정
  // 버튼 클릭 시 이동 구현하기, 텍스트에 onClick 구현
  return (
    <Box>
      <CharacterProfile></CharacterProfile>
      <form>
        <ProfileEdit></ProfileEdit>
      <Box sx={{ display: "flex", justifyContent:"center" }}>
        <Box sx={{ mt:2 }}>
          <TextStyle size="small" variant="black">비밀번호 변경하기</TextStyle>
        </Box>
        <Box sx={{ mt:2, ml:2 }}>
          <TextStyle size="small" variant="primary">회원 탈퇴</TextStyle>
        </Box>
      </Box>
      <Box sx={{ display:"flex", justifyContent:"center" }}> 
        <ButtonStyle size="medium" variant="grey">취소</ButtonStyle>
        <ButtonStyle size="medium" variant="primary">저장</ButtonStyle>
      </Box>
      </form>
    </Box>  
  );
}
