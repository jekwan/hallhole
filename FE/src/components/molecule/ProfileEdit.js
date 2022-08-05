import React from "react";
import { Box } from "@mui/system";
import { MenuItem, FormControl, Select, InputLabel } from "@mui/material"

import BirthPicker from "../atom/BirthPicker";
import TextStyle from "../atom/Text";
import Input from "../atom/Input"

export default function ProfileEdit(props) {
  const [gender, setGender] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  
  return (
    // 프로필 설정에서 변경할 수 있는 모든 폼들이 모여있습니다.
    <Box sx={{ml:3, mt:2}}>
        <Box>
          <TextStyle size="medium">닉네임</TextStyle>
          <br></br>
          <Input size="large"></Input>
          <br></br>
          <TextStyle size="medium">자기소개</TextStyle>
          <br></br>
          <Input size="large"></Input>
          <br></br>
          <TextStyle size="medium">이메일</TextStyle>
          <br></br>
          <Input size="large"></Input>
          <br></br>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Box>
            <TextStyle size="medium">성별</TextStyle>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="gender">성별</InputLabel>
                <Select
                  labelId="gender"
                  id="gender-selector"
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={gender}
                  label="setGender"
                  onChange={handleChange}
                >
                  <MenuItem value="N">비공개</MenuItem>
                  <MenuItem value="M">남자</MenuItem>
                  <MenuItem value="F">여자</MenuItem>
                </Select>
            </FormControl>
          </Box>
          <Box>
            <TextStyle size="medium">생년월일</TextStyle>
            <br></br>
              <BirthPicker></BirthPicker>
          </Box>
        </Box>
    </Box>
  );
}
