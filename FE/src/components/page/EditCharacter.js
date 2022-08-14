import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { styled } from "@mui/system";

import ToggleButton from "../molecule/ToggleButton";
import CategoryDivider from "../atom/CategoryDivider";
import TextStyle from "../atom/Text";
import ButtonStyle from "../atom/Button";
import CircleIcon from '@mui/icons-material/Circle';
import Accessory from "../atom/Accessory";
import Partition from "../atom/CharacterPart";

import { useSelector } from "react-redux";
// 캐릭터 수정 api
import { changeCharacter, customedCharacter } from "../../apis/item";

const ToggleBox = styled(Box)`
  margin-top: 5%;
  text-align: center;
`;

const charNum = {
  0: 'default',
  1: 'black',
  2: 'green',
  3: 'yellow',
  4: 'orange',
  5: 'red',
  6: 'primary',
}
// 해야할 것 :  캐릭터 색상 버튼에 value 값들 숫자로 변경한 후 숫자에 맞는 value값이 변경값에 들어갈 수 있도록
// setAcc, setChar 에 들어간 정보 서버로 보내서 DB에 저장시키기 (되는지 확인 후 캐릭터 프로필 열 때 정보 보이는지 확인)
// 취소, 저장버튼 눌렀을 때 동작 . 취소 -> EditProfile, 현재 정보를 저장하지 않고 나가시겠습니까? 저장 -> 서버로 보내고 alert 정상적으로 저장되었습니다 띄우기

const accNum = {
    0: 'nothing',
    1: 'note',
    2: 'wings',
    3: 'boots',
    4: 'hair',
    5: 'paper',
    6: 'mask',
    7: 'smile',
    8: 'apple'
}

export default function EditCharacter() {
  const user = useSelector(state => state.user.info);
  // togglebutton 용
  const [choose, setChoose] = React.useState(true);
  const [char, setChar] = React.useState(0);
  const [bodyColor, setBodyColor] = React.useState('');
  const [armColor, setArmColor] = React.useState('');
  const [acc, setAcc] = React.useState(0);

  // 기존 캐릭터 정보 가져오기
  useEffect(() => {
    console.log(user);
    customedCharacter(user?.idTag, characterLoadSuccess, characterLoadFail);
  }, [user])
  
  // 캐릭터 정보 불러오기 성공 시 - 색상 가져오기, 악세사리 정보 가져오기
  function characterLoadSuccess(res) {
    const nowColor = res.data.character
    const nowAcc = res.data.acc
    const userId = res.data.idTag
    setBodyColor('/body_' + charNum[nowColor] + '.png');
    setArmColor('/arm_' + charNum[nowColor] + '.png');
    setAcc('/' + accNum[nowAcc] + '.png');
  } 
  
  function characterLoadFail(err) {
    console.log("캐릭터 정보 불러오기 실패", err);
    // 불러오기 실패 후 가장 기본 캐릭터 모습으로 보여주기
    // 기본 캐릭터 정보 캐릭터 색상 하양, 아무것도 액세서리 착용하지 않음 
    characterLoadFail.defaultProps = {
      setArmColor: '/arm_default.png',
      setBodyColor: '/body_default.png',
    }
  }
  
  
  // 캐릭터 색상 선택 시 값이 전달됨
  function pickColor({char}) {
    return () => {
      setChar(char);
      setArmColor('/arm_'+char+'.png');
      setBodyColor('/body_'+char+'.png')
    }
  }
  
  function pickAcc({acc}) {
    return () => {
      setAcc(acc);
    }
  }
  
  function changeConfirm(userId, acc, char) {
    changeCharacter(userId, acc, char);
    console.log(userId, acc, char)
  }
    
  return (
    <Box>
      <Box sx={{ ml: 2 }}>
        <Box sx={{ mt: 1 }}>
          <TextStyle size="large" variant="black">
            🔃 내 캐릭터 변경
          </TextStyle>
        </Box>
        <Box sx={{ my: 0.5, mr: 2 }}>
          <CategoryDivider type="dark"/>
        </Box>
        <Box>
          <TextStyle size="small" variant="black">
            색상/소품 선택 후 저장버튼을 터치하세요
          </TextStyle>
        </Box>
      </Box>
      <Box sx={{ mt: 1.5 }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <TextStyle size="medium" variant="black">
            🔎미리보기
          </TextStyle>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 1 }}>
          <Box sx={{ display:"flex", alignItems:"center", justifyContent: "center", width: 250, height: 200, p: 2, border: 3, borderColor:'black', borderRadius: 5 }}>
            {/* 캐릭터 색상 선택 및 소품 선택 시 해당 아래 박스의 png가 변경되어야 함 */}
            <Box sx={{ mt:5, display:"flex", position: "relative", justifyContent: "center", alignItems: "center"}}>
              {/* 해당 부분 코드에서 캐릭터의 값을 받아와 보여지도록 해야한다. */}
              {/* 등 위치 (날개) */}
              { acc === 2 &&
              <Partition sx={{ mb:4, position:"absolute", height:70, width:250, zIndex:9 }} src="/wings.png"/>}
              <Box sx={{ display:"flex", flexDirection:"column", alignItems:"center", position:"absolute"}}>         
                <Partition sx={{ height:'auto', width:120, zIndex:10 }} src={bodyColor}/>
              </Box>
              {/* 팔, 머리 위치  (악보, 데스노트, 사과, 가발, 부츠) */}
              { acc === 1 &&
              <Partition sx={{ mt:5, position:"absolute", height:"auto", width:35, zIndex:12 }} src="/note.png"/>}
              { acc === 3 &&
              <Partition sx={{ mb:24, position:"absolute", height:"auto", width:60, zIndex:12 }} src="/boots.png"/>}
              { acc === 4 &&
              <Partition sx={{ mb:13, position:"absolute", height:"auto", width:130, zIndex:12 }} src="/hair.png"/>}
              { acc === 5 &&
              <Partition sx={{ mt:5, position:"absolute", height:"auto", width:35, zIndex:12 }} src="/paper.png"/>}
              { acc === 8 &&
              <Partition sx={{ mt:4.5, position:"absolute", height:"auto", width:45, zIndex:12 }} src="/apple.png"/>}
              <Box sx={{ position:"absolute", display:"flex", flexDirection:"column", alignItems:"center"}}>
              { char && 
                <Partition sx={{ mt:2, width: 55, height:'', zIndex:13 }} src={armColor}/> }
              </Box>
              {/* 얼굴 위치 (가면, 웃는남자) */}
              { acc === 6 &&
              <Partition sx={{ mr:6, mb:10, position:"absolute", height:"auto", width:50, zIndex:12 }} src="/mask.png"/>}
              { acc === 7 &&
              <Partition sx={{ ml:0.2, mb:7.2, position:"absolute", height:"auto", width:50, zIndex:12 }} src="/smile.png"/>}
            </Box>
          </Box>
        </Box>
      </Box>
      <ToggleBox>
        <ToggleButton
          textLeft="　🧪색상"
          textRight="　　💎소품　 "
          onClickLeft={() => setChoose(true)}
          onClickRight={() => setChoose(false)}
        />
      </ToggleBox>
      {/* 캐릭터 색상 선택 창 -> 몸통, 표정, 팔 각각 파편화 되어있으며 합쳐져서 보입니다 */}
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {choose && (
          <Box sx={{ width: 250, height: 250, backgroundColor: "skyblue", p: 2, borderRadius: 5 }}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <CircleIcon sx={{ fontSize: 80, color: "white" }} onClick={ pickColor({ char:'default' }) } />
              <CircleIcon sx={{ fontSize: 80, color: "black" }} onClick={ pickColor({ char:'black' }) } />
              <CircleIcon sx={{ fontSize: 80, color: "#aece2d" }} onClick={ pickColor({ char:'green' }) } />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <CircleIcon sx={{ fontSize: 80, color: "#f8ea67" }} onClick={ pickColor({ char:'yellow' }) } />
              <CircleIcon sx={{ fontSize: 80, color: "#e0712c" }} onClick={ pickColor({ char:'orange' }) } />
              <CircleIcon sx={{ fontSize: 80, color: "#a63d36" }} onClick={ pickColor({ char:'red' }) } />
            </Box>
            <Box sx={{ ml: 0.5 }}>
              <CircleIcon sx={{ fontSize: 80, color: "#e37373" }} onClick={ pickColor({ char:'primary' }) } />
            </Box>
          </Box>
        )}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {!choose && (
          <Box sx={{ width: 250, height: 250, backgroundColor: "skyblue", p: 2, borderRadius: 5 }}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Box sx={{ width:60, height:60, border: '1px dashed grey', borderRadius: 2, mr: 1 }} onClick={ pickAcc({acc: 0}) } />
              <Accessory src="/note.png" onClick={ pickAcc({acc: 1}) } />
              <Accessory src="/wings.png" onClick={ pickAcc({acc: 2}) } />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Accessory src="/boots.png" onClick={ pickAcc({acc: 3}) } />
              <Accessory src="/hair.png" onClick={ pickAcc({acc: 4}) } />
              <Accessory src="/paper.png" onClick={ pickAcc({acc: 5}) } />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Accessory src="/mask.png" onClick={ pickAcc({acc: 6}) } />
              <Accessory src="/smile.png" onClick={ pickAcc({acc: 7}) } />
              <Accessory src="/apple.png" onClick={ pickAcc({acc: 8})}/>
            </Box>
          </Box>
        )}
        </Box>
      <Box sx={{ display:"flex", justifyContent:"center" }}> 
        <ButtonStyle size="medium" variant="grey">취소</ButtonStyle>
        <ButtonStyle size="medium" variant="primary" onClick={ changeConfirm } >저장</ButtonStyle>
      </Box>
    </Box>
  );
}