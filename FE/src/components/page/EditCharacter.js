import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { styled } from "@mui/system";
import { useNavigate } from "react-router";
import { setUserInfoToStore } from "../../stores/user";

import ToggleButton from "../molecule/ToggleButton";
import CategoryDivider from "../atom/CategoryDivider";
import TextStyle from "../atom/Text";
import ButtonStyle from "../atom/Button";
import CircleIcon from '@mui/icons-material/Circle';
import Accessory from "../atom/Accessory";
import Partition from "../atom/CharacterPart";

import { useSelector,useDispatch } from "react-redux";

import storage from "../../helper/storage";
import { changeCharacter, customedCharacter } from "../../apis/item";
import { requestMyInfo } from "../../apis/user";

const ToggleBox = styled(Box)`
  margin-top: 5%;
  text-align: center;
`;

const charNum = {
  1: 'black',
  2: 'green',
  3: 'yellow',
  4: 'orange',
  5: 'skyblue',
  6: 'primary',
  7: 'default',
}

const accNum = {
    9: 'nothing',
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
  const [choose, setChoose] = React.useState(true);
  const [char, setChar] = React.useState(7);
  const [bodyColor, setBodyColor] = React.useState('');
  const [armColor, setArmColor] = React.useState('');
  const [acc, setAcc] = React.useState(9);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setChar(user.nowChar);
    setAcc(user.nowAcc);
    customedCharacter(user?.idTag, characterLoadSuccess, characterLoadFail);
  }, [user])

  function characterLoadSuccess(res) {
    const nowColor = user.nowChar
    const nowAcc = user.nowAcc
    const colorName = charNum[nowColor]
    setBodyColor('/body_' + colorName + '.png');
    setArmColor('/arm_' + colorName + '.png');
    setAcc(nowAcc)
  } 
  
  function characterLoadFail(err) {
    characterLoadFail.defaultProps = {
      setBodyColor: '/body_default.png',
      setArmColor: '/arm_default.png',
      setAcc: 9,
    }
  }
  
  function pickColor({char}) {
    return () => {
      const charColor = charNum[char]
      setChar(char);
      setArmColor('/arm_'+charColor+'.png');
      setBodyColor('/body_'+charColor+'.png');
    }
  }
  
  function pickAcc({acc}) {
    return () => {
      setAcc(acc);
    }
  }
  
  const movePage = useNavigate();

  function changeConfirm() {
    const userId = user.idTag
    const pickedAcc = acc
    const pickedChar = char
    changeCharacter(userId, pickedAcc, pickedChar, (res) => {
      requestMyInfo(
        res => {
          dispatch(setUserInfoToStore(res.data));
        },
        err => {
          storage.remove("token");
          navigate(`/profile/${userId}`);
        },
      );
    });
    movePage(`/profile/${userId}`);
  }

  function cancelEdit() {
    const userId = user.idTag
    movePage(`/profile/${userId}`)
  }
    
  return (
    <Box>
      <Box sx={{ ml: 2 }}>
        <Box sx={{ mt: 2 }}>
          <TextStyle size="large" variant="black">
          👕 캐릭터 꾸미기
          </TextStyle>
        </Box>
        <Box sx={{ my: 0.5, mr: 2 }}>
          <CategoryDivider type="dark"/>
        </Box>
        <Box>
          <TextStyle size="smaller" variant="black" weight="lighter">
            색상/액세서리 선택 후 저장 버튼을 누르세요
          </TextStyle>
        </Box>
      </Box>
      <Box sx={{ mt: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <TextStyle size="medium" variant="black">
            🔎미리보기
          </TextStyle>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 1 }}>
          <Box sx={{ display:"flex", alignItems:"center", justifyContent: "center", width: 250, height: 200, p: 2, border: 3, borderColor:'black', borderRadius: 5 }}>
            <Box sx={{ mt:5, display:"flex", position: "relative", justifyContent: "center", alignItems: "center"}}>
              {/* 등 위치 (날개) */}
              { acc === 2 &&
              <Partition sx={{ mb:4, position:"absolute", height:70, width:250, zIndex:9 }} src="/wings.png"/>}
              <Box sx={{ display:"flex", flexDirection:"column", alignItems:"center", position:"absolute"}}>         
                <Partition sx={{ height:'auto', width:120, zIndex:10 }} src={bodyColor}/>
              </Box>
              {/* 팔, 머리 위치  (악보, 데스노트, 사과, 가발, 부츠) */}
              { acc === 1 &&
              <Partition sx={{ mt:3, position:"absolute", height:"auto", width:35, zIndex:12 }} src="/note.png"/>}
              { acc === 3 &&
              <Partition sx={{ mb:24, position:"absolute", height:"auto", width:60, zIndex:12 }} src="/boots.png"/>}
              { acc === 4 &&
              <Partition sx={{ mb:13, position:"absolute", height:"auto", width:130, zIndex:12 }} src="/hair.png"/>}
              { acc === 5 &&
              <Partition sx={{ mt:2, position:"absolute", height:"auto", width:35, zIndex:12 }} src="/paper.png"/>}
              { acc === 8 &&
              <Partition sx={{ mt:2, position:"absolute", height:"auto", width:40, zIndex:12 }} src="/apple.png"/>}
              <Box sx={{ position:"absolute", display:"flex", flexDirection:"column", alignItems:"center"}}>
                <Partition sx={{ mt:2, width: 55, height:'', zIndex:13 }} src={armColor}/>
              </Box>
              {/* 얼굴 위치 (가면, 웃는남자) */}
              { acc === 6 &&
              <Partition sx={{ mr:6, mb:10.3, position:"absolute", height:"auto", width:50, zIndex:12 }} src="/mask.png"/>}
              { acc === 7 &&
              <Partition sx={{ ml:0.1, mb:7.2, position:"absolute", height:"auto", width:50, zIndex:12 }} src="/smile.png"/>}
            </Box>
          </Box>
        </Box>
      </Box>
      <ToggleBox>
        <ToggleButton
          textLeft="　　색상"
          textRight="　　액세서리　 "
          onClickLeft={() => setChoose(true)}
          onClickRight={() => setChoose(false)}
        />
      </ToggleBox>

      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {choose && (
          <Box sx={{ width: 250, height: 250, backgroundColor: "skyblue", p: 2, borderRadius: 5 }}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <CircleIcon sx={{ fontSize: 80, color: "white" }} onClick={ pickColor({ char: 7 }) } />
              <CircleIcon sx={{ fontSize: 80, color: "black" }} onClick={ pickColor({ char: 1 }) } />
              <CircleIcon sx={{ fontSize: 80, color: "#aece2d" }} onClick={ pickColor({ char: 2 }) } />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <CircleIcon sx={{ fontSize: 80, color: "#f8ea67" }} onClick={ pickColor({ char: 3 }) } />
              <CircleIcon sx={{ fontSize: 80, color: "#e0712c" }} onClick={ pickColor({ char: 4 }) } />
              <CircleIcon sx={{ fontSize: 80, color: "#60bde7" }} onClick={ pickColor({ char: 5 }) } />
            </Box>
            <Box sx={{ ml: 0.5 }}>
              <CircleIcon sx={{ fontSize: 80, color: "#e37373" }} onClick={ pickColor({ char: 6 }) } />
            </Box>
          </Box>
        )}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {!choose && (
          <Box sx={{ width: 250, height: 250, backgroundColor: "skyblue", p: 2, borderRadius: 5 }}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Box sx={{ width:60, height:60, border: '1px dashed grey', borderRadius: 2, mr: 1 }} onClick={ pickAcc({acc: 9}) } />
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
      <Box sx={{ mt: 2, mx: 5, display:"flex", justifyContent:"space-evenly" }}> 
        <ButtonStyle size="medium" variant="grey" onClick={ cancelEdit }>취소</ButtonStyle>
        <ButtonStyle size="medium" variant="primary" onClick={ changeConfirm } >저장</ButtonStyle>
      </Box>
    </Box>
  );
}