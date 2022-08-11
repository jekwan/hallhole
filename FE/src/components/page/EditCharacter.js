import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { styled } from "@mui/system";

import ToggleButton from "../molecule/ToggleButton";
import CategoryDivider from "../atom/CategoryDivider";
import TextStyle from "../atom/Text";
import SaveCancel from "../molecule/SaveCancel";
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

// 색상 변경 관련
const charNum = {
  white: 0,
  black: 1,
  green: 2,
  yellow: 3,
  orange: 4,
  red: 5,
  signature: 6,
}

const accNum = {
  nothing: 0,
  note: 1,
  wings: 2,
  boots: 3,
  hair: 4,
  papers: 5,
  mask: 6,
  smile: 7,
  apple: 8,
}

export default function EditCharacter() {
  const user = useSelector(state => state.user.info);
  // togglebutton 용
  const [choose, setChoose] = React.useState(true);
  // 색상, 악세사리
  const [char, setChar] = React.useState(0);
  const [acc, setAcc] = React.useState(0);

  // 기존 캐릭터 정보 가져오기
  useEffect(() => {
    customedCharacter(user?.idTag, characterLoadSuccess, characterLoadFail);
  }, [user])
  
  // 캐릭터 정보 불러오기 성공 시 - 색상 가져오기, 악세사리 정보 가져오기
  function characterLoadSuccess(res) {
    setChar(res.data.character);
    setAcc(res.data.acc);
    console.log(res)
  }

  function characterLoadFail(err) {
    console.log("캐릭터 정보 불러오기 실패", err);
    // 불러오기 실패 후 가장 기본 캐릭터 모습으로 보여주기
    // 기본 캐릭터 정보 캐릭터 색상 하양, 아무것도 액세서리 착용하지 않음 
    characterLoadFail.defaultProps = {
      character: 0,
      acc: 0,
    }
  }
  
  // 캐릭터 색상 선택 시 값이 전달됨
  function pickColor({ char }) {
    return () => {
      setChar(char);
      console.log(char)
    }
  }
  // 액세서리 선택 시 값이 전달됨
  function pickAcc({ acc }) {
    return () => {
      setAcc(acc);
      console.log(acc)
    }
  }


  return (
    <Box>
      <Box sx={{ ml: 2 }}>
        <Box sx={{ mt: 1 }}>
          <TextStyle size="large" variant="black">
            🎨 캐릭터 꾸미기
          </TextStyle>
        </Box>
        <Box sx={{ my: 0.5, mr: 2 }}>
          <CategoryDivider type="dark"/>
        </Box>
        <Box>
          <TextStyle size="small" variant="black">
            나만의 캐릭터를 꾸며보아요
          </TextStyle>
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <TextStyle size="medium" variant="black">
            🔎 미리보기
          </TextStyle>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 1 }}>
          <Box sx={{ display:"flex", alignItems:"center", justifyContent: "center", width: 250, height: 200, backgroundColor: "beige", p: 2, borderRadius: 5 }}>
            {/* 캐릭터 색상 선택 및 소품 선택 시 해당 아래 박스의 png가 변경되어야 함 */}
            <Box sx={{ mt:5, display:"flex", position: "relative", justifyContent: "center", alignItems: "center"}}>
              {/* 해당 부분 코드에서 캐릭터의 값을 받아와 보여지도록 해야한다. */}
              {/* 등 부분에 들어가는 악세사리 위치 (날개) */}
                <Partition sx={{ mb:4, position:"absolute", height:70, width:250 }} src="acc/death_wing.png"/>
              <Box sx={{ display:"flex", flexDirection:"column", alignItems:"center", position:"absolute"}}>
                <Partition sx={{ height:'auto', width:120 }} src="char/body_default.png"/>
              </Box>
              {/* 머리 부분에 들어가는 악세사리 위치 (가발, 킹키부츠) */}
                {/* <Partition sx={{ mb:13, position:"absolute", height:"auto", width:130 }} src="acc/mozart_hair.png"/> */}
                {/* <Partition sx={{ mb:24, position:"absolute", height:"auto", width:60 }} src="acc/kinky_boots.png"/>    */}
              {/* 팔 부분에 들어가는 악세사리 위치  (악보, 데스노트, 사과) */}
              {/* <Partition sx={{ position:"absolute", mt:5, height:"auto", width:35 }} src="acc/mozart_paper.png"/>    */}
              <Partition sx={{ position:"absolute", mt:5, height:"auto", width:35 }} src="acc/death_note.png"/>   
              {/* <Partition sx={{ position:"absolute", mt:4.5, height:"auto", width:45 }} src="acc/death_apple.png"/>    */}
              <Box sx={{ position:"absolute", display:"flex", flexDirection:"column", alignItems:"center"}}>
                <Partition sx={{ height:'auto', width:50 }} src="char/face_default.png"/> 
                <Partition sx={{ mt:2, width: 55, height:'', }} src="char/arm_default.png"/>
              </Box>
              {/* 얼굴 부분에 들어가는 악세사리 위치 (가면, 웃는남자) */}
              <Partition sx={{ mr: 6,mb: 7, position:"absolute", height:"auto", width:55 }} src="acc/opera_mask.png"/>   
              {/* <Partition sx={{ mb: 3.7, position:"absolute", height:"auto", width:60 }} src="acc/smileman.png"/>    */}
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
              <CircleIcon sx={{ fontSize: 80, color: "white" }} onClick={ pickColor({ char:'white' }) } />
              <CircleIcon sx={{ fontSize: 80, color: "black" }} onClick={ pickColor({ char:'black' }) } />
              <CircleIcon sx={{ fontSize: 80, color: "#aece2d" }} onClick={ pickColor({ char:'green' }) } />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <CircleIcon sx={{ fontSize: 80, color: "#f8ea67" }} onClick={ pickColor({ char:'yellow' }) } />
              <CircleIcon sx={{ fontSize: 80, color: "#e0712c" }} onClick={ pickColor({ char:'orange' }) } />
              <CircleIcon sx={{ fontSize: 80, color: "#a63d36" }} onClick={ pickColor({ char:'red' }) } />
            </Box>
            <Box sx={{ ml: 0.5 }}>
              <CircleIcon sx={{ fontSize: 80, color: "#e37373" }} onClick={ pickColor({ char:'signature' }) } />
            </Box>
          </Box>
        )}
        {!choose && (
          <Box sx={{ width: 250, height: 250, backgroundColor: "skyblue", p: 2, borderRadius: 5 }}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Box sx={{ width:60, height:60, border: '1px dashed grey', borderRadius: 2, mr: 1 }} onClick={pickAcc({ acc:'nothing'})} />
              <Accessory src="acc/death_note.png" onClick={ pickAcc({ acc:'note'}) } />
              <Accessory src="acc/death_wing.png" onClick={ pickAcc({ acc:'wings'}) } />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Accessory src="acc/kinky_boots.png" onClick={ pickAcc({ acc:'boots'}) } />
              <Accessory src="acc/mozart_hair.png" onClick={ pickAcc({ acc:'hair'}) } />
              <Accessory src="acc/mozart_paper.png" onClick={ pickAcc({ acc:'papers'}) } />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Accessory src="acc/opera_mask.png" onClick={ pickAcc({ acc:'mask'}) } />
              <Accessory src="acc/smileman.png" onClick={ pickAcc({ acc:'smile'}) } />
              <Accessory src="acc/death_apple.png" onClick={ pickAcc({ acc:'apple'}) } />
            </Box>
          </Box>
        )}
      </Box>
      <Box sx={{ mt: 1 }}>
        <SaveCancel></SaveCancel>
      </Box>
    </Box>
  );
}

