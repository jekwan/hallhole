import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { MenuItem, FormControl, Select, InputLabel, Button } from "@mui/material"
import { useSelector } from "react-redux";
import { requestUserInfo, userEditProfile } from "../../apis/user";
import TextStyle from "../atom/Text";
import Input from "../atom/Input"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router";
import ButtonStyle from "../atom/Button";
import dayjs from "dayjs";


const genderName = {
  'F' : '여자',
  'M' : '남자',
  'N' : '비공개',
}

export default function ProfileEdit() {
  const user = useSelector(state => state.user.info)
  const [open, setOpen] = React.useState(false);
  const [gender, setGender] = React.useState('');
  const [name, setName] = React.useState('')
  const [profile, setProfile] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [birth, setBirth] = React.useState('')
  const dateFormat = dayjs(birth).format("YYYY-MM-DD");
  
  useEffect(() => {
    requestUserInfo(user?.idTag, getProfileUserSuccess, getProfileUserFail);
    setName(user?.name)
    setProfile(user?.profile)
    setGender(user?.gender)
    setEmail(user?.email)
    setBirth(user?.birth)
  }, [user]);
  
  function getProfileUserSuccess(res) {
    console.log(user)
    setName(user?.name)
    setProfile(user?.profile)
    setGender(user?.gender)
    setEmail(user?.email)
    setBirth(user?.birth)
    // window.location.replace("/editprofile")
  }

  function getProfileUserFail(err) {
    console.log('에러')
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
    const nowAcc = user.nowAcc
    const nowBg = user.nowBg
    const nowChar = user.nowChar
    const birth = dateFormat
    userEditProfile(birth, email, gender, userId, name, nowAcc, nowBg, nowChar, profile)
    alert('성공적으로 저장되었습니다.')
    console.log(birth)
    movePage(`/profile/${userId}`)
  }

  return (
    <Box sx={{ mx:6.5, my:2, display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: 'column',}}>
      <Box>
        <TextStyle size="medium">이름</TextStyle>
        <Input 
        size="large" 
        value={name} 
        onChange={(e) => {setName(e.target.value)}}></Input>
      </Box>
      <Box sx={{ my: 2 }}>
        <TextStyle size="medium">소개</TextStyle>
        <Box>
        <TextStyle size="small">최대 50자만 입력 가능합니다.</TextStyle>
        </Box>
        <Input size="large" value={profile} onChange={(e) => {setProfile(e.target.value)}} />
      </Box>
      <Box>
        <TextStyle size="medium">이메일</TextStyle>
        <Input size="large" read-Only value={email}/>
      </Box>
      <Box sx={{ mt: 2, width:"100%", display: "flex", flexDirection:"row", alignItems:"center", justifyContent:"space-around" }}>
        <Box sx={{ display: "flex", flexDirection:"column", alignItems:"start" }}>
          <TextStyle size="medium">성별</TextStyle>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="gender">{genderName[gender]}</InputLabel>
              <Select
                labelId="gender"
                id="gender-selector"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                label="gender"
                onChange={(e) => {setGender(e.target.value)}}
              >
                <MenuItem value="N">비공개</MenuItem>
                <MenuItem value="M">남자</MenuItem>
                <MenuItem value="F">여자</MenuItem>
              </Select>
          </FormControl>
        </Box>
        <Box sx={{ ml: 2 }}>
          <TextStyle size="medium">생년월일</TextStyle>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              inputFormat={"yyyy-MM-dd"}
              mask={"____-__-__"}
              value={dateFormat}
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
      <Box sx={{ mt:2 }}>
        <Button size="small" variant="text" onClick={ changePassword }>비밀번호 변경하기</Button>
      </Box>
        <Button size="small" variant="text">회원 탈퇴</Button>
    </Box>
  ); 
}