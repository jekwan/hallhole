import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { requestMyInfo ,requestUserInfo, userEditProfile } from "../../apis/user";

import TextStyle from "../atom/Text";
import Input from "../atom/Input"
import ButtonStyle from "../atom/Button";
import CategoryDivider from "../atom/CategoryDivider"
import DeleteModal from "../molecule/DeletModal";

import { Box } from "@mui/system";
import TextField from '@mui/material/TextField';
import { MenuItem, FormControl, Select, InputLabel, Button } from "@mui/material"

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { setUserInfoToStore } from "../../stores/user";


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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    requestUserInfo(user?.idTag, getProfileUserSuccess, getProfileUserFail);
    setName(user?.name)
    setProfile(user?.profile)
    setGender(user?.gender)
    setEmail(user?.email)
    setBirth(user?.birth)
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

  function cancelEdit() {
    movePage(`/profile/${user.idTag}`)
  }

  function changePassword(){
    movePage(`/forgot`)
  }

  function changeConfirm() {
    const userId = user.idTag
    userEditProfile(birth, email, gender, userId, name, profile, (res) => {
      requestMyInfo(
        res => {
          dispatch(setUserInfoToStore(res.data));
        },
        err => {
          storage.remove("token");
          navigate(`/profile/${userId}`);
        },
      );
    })
    alert("프로필 변경이 완료되었습니다.");
    movePage(`/profile/${userId}`)
    location.reload();
  }

  return (
    <Box sx={{ mx:6.5, my:2, display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: 'column',}}>
      <Box sx={{my:1, textAlign: "left"}}>
        <TextStyle size="large">내 프로필 수정 ✍</TextStyle>
      </Box>
      <CategoryDivider type="thinDark"/>
      <Box sx={{ mt: 1, display: "flex", flexDirection: 'column' }}>
      <TextStyle size="medium">{email}</TextStyle>
      <Button sx={{ mt: 1}} size="small" variant="text" onClick={ changePassword }>비밀번호 변경하기</Button>
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
        <TextStyle size="small"></TextStyle>
        </Box>
        <Input size="large" value={profile} onChange={(e) => {setProfile(e.target.value)}} />
      </Box>
      <Box sx={{ width:"100%", display: "flex", flexDirection:"row", alignItems:"center", justifyContent:"space-around" }}>
        <Box sx={{ display: "flex", flexDirection:"column", alignItems:"start" }}>
          <TextStyle size="medium">성별</TextStyle>
          <FormControl sx={{ minWidth: 310}}>
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
      </Box>
        <Box sx={{ mt:2 }}>
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
      <Box sx={{ mt: 2, width:"100%",display:"flex", justifyContent:"space-between", alignItems:"center" }}> 
        <ButtonStyle size="medium" variant="grey" onClick={ cancelEdit }>취소</ButtonStyle>
        <ButtonStyle size="medium" variant="primary" onClick={ changeConfirm }>저장</ButtonStyle>
      </Box>
        <DeleteModal/>
    </Box>
  );
}