import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { requestUserInfo, userEditProfile, } from "../../apis/user";

import BirthPicker from "../atom/BirthPicker";
import TextStyle from "../atom/Text";
import Input from "../atom/Input"
import ButtonStyle from "../atom/Button";
import CategoryDivider from "../atom/CategoryDivider"
import DeleteModal from "../molecule/DeletModal";

import { Box, Modal as MUIModal } from "@mui/system";
import TextField from '@mui/material/TextField';
import { MenuItem, FormControl, Select, InputLabel, Button } from "@mui/material"

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';



const genderName = {
  'F' : '여자',
  'M' : '남자',
  'N' : '비공개',
}

export default function ProfileEdit(props) {
  const [gender, setGender] = React.useState('');
  const [name, setName] = React.useState('')
  const [profile, setProfile] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [birth, setBirth] = React.useState('')

  const profileUpdate = async (user) => {
    await requestUserInfo(user?.idTag, getProfileUserSuccess, getProfileUserFail);
    setName(user?.name)
    setProfile(user?.profile)
    setGender(user?.gender)
    setEmail(user?.email)
    setBirth(user?.birth)
  }

  useEffect(() => {
    profileUpdate(user)
  }, [user]);
  
  function getProfileUserSuccess(res) {
    setName(user?.name)
    setProfile(user?.profile)
    setGender(user?.gender)
    setEmail(user?.email)
    setBirth(user?.birth)
  }

  function getProfileUserFail(err) {
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  
  const movePage = useNavigate();

  // 취소 후 본인 프로필로 이동
  function cancelEdit() {
    movePage(`/profile/${user.idTag}`)
  }

  function changePassword(){
    movePage(`/forgot`)
  }

  function changeConfirm() {
    const userId = user.idTag
    userEditProfile(birth, email, gender, userId, name, profile)
    alert("프로필 변경이 완료되었습니다.");
    movePage(`/profile/${userId}`)
    location.reload();
  }

  return (
    // 프로필 설정에서 변경할 수 있는 모든 폼들이 모여있습니다.
    // 마진 관련 재설정 필요(px외 단위로), 위치 설정
    <Box sx={{ ml:4, mt:2, display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',}}>
      <CategoryDivider type="thinDark"/>
      <Box sx={{ mt:1, display: "flex", flexDirection: 'column' }}>
      <TextStyle size="medium">{email}</TextStyle>
      <Button sx={{ mt: 1 }} size="small" variant="text" onClick={ changePassword }>비밀번호 변경하기</Button>
      </Box>
      <CategoryDivider type="thinDark"/>
      <Box sx={{mt:2}}>
        <TextStyle size="medium">이름</TextStyle>
        <Input 
        size="large" 
        value={name} 
        onChange={(e) => {setName(e.target.value)}}></Input>
      </Box>
      <Box sx={{ my: 2 }}>
        <TextStyle size="medium">한 줄 소개</TextStyle>
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
        <Box sx={{ ml: 1.5 }}>
          <TextStyle size="medium">생년월일</TextStyle>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              inputFormat={"yyyy-MM-dd"}
              mask={"____-__-__"}
              value={birth}
              onChange={(newBirth) => {
                setBirth(newBirth);
              }}
              renderInput={(params) => <TextField {...params} sx={{ width: '100%' }} />}
            />
          </LocalizationProvider>
        </Box> 
      </Box>
      <Box sx={{ mt: 2, width:"100%",display:"flex", justifyContent:"space-between", alignItems:"center" }}> 
        <ButtonStyle size="medium" variant="grey" onClick={ cancelEdit }>취소</ButtonStyle>
        <ButtonStyle size="medium" variant="primary" onClick={ changeConfirm }>저장</ButtonStyle>
      </Box>
        <DeleteModal/>
    </Box>
  );
}