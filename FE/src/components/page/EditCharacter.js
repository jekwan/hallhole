import React from "react";
import { Box } from "@mui/system";
import { styled } from "@mui/system";

import ToggleButton from "../molecule/ToggleButton";
import CategoryDivider from "../atom/CategoryDivider";
import TextStyle from "../atom/Text";
import SaveCancel from "../molecule/SaveCancel";

import CircleIcon from '@mui/icons-material/Circle';
import Accessory from "../atom/Accessory";
import PosterImage from "../atom/PosterSize";

import { changeCharacter, customedCharacter } from "../../apis/item";

const ToggleBox = styled(Box)`
  margin-top: 5%;
  text-align: center;
`;

// const colorNum = {
//   // 숫자 = key , color = string
//   0: white,
//   1: black,
//   2: '#aece2d',
//   yellow: 3,
//   orange: 4,
//   red: 5,
//   signature: 6,
// }



export default function EditCharacter({ userId }) {
  const [choose, setChoose] = React.useState(true);
  const [color, setColor] = React.useState(0);
  const [acc, setAcc] = React.useState(0);

  // 기존 캐릭터 정보 가져오기
  // useEffect(() => {
  //   customedCharacter(userId, characterLoadSuccess, characterLoadFail);
  // })
  
  // 캐릭터 정보 불러오기 성공 시 - 색상 가져오기, 악세사리 정보 가져오기
  function characterLoadSuccess(res) {
    setColor(res.data.character);
    setAcc(res.data.acc);
  }

  function characterLoadFail(err) {
    console.log("캐릭터 정보 불러오기 실패", err);
    // 불러오기 실패 후 가장 기본 캐릭터 모습으로 보여주기
    // 기본 캐릭터 정보 캐릭터 색상 하양, 아무것도 액세서리 착용하지 않음 
    characterLoadFail.defaultProps = {
      character: 1,
      acc: 1,
    }
  }
  
  function createOnClickEvent({ color }) {
    return () => {
      setColor(color);
      console.log(color)
    }
  }

  const colorChange = (e) => {
    setColor(e.target.value);
    console.log(e.target.value)
  }
  
  const accChange = (e) => {
    setAcc(e.target.value);
    console.log(e.target.value)
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
          <CategoryDivider type="dark"></CategoryDivider>
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
          <Box sx={{ width: 250, height: 200, backgroundColor: "beige", p: 2, borderRadius: 5 }}>
            {/* 캐릭터 색상 선택 및 소품 선택 시 해당 아래 박스의 png가 변경되어야 함 */}
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt:5 }}>
              <PosterImage size="small" src="holymoly.png"/>
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
              <CircleIcon sx={{ fontSize: 80, color: "white" }} onClick={createOnClickEvent({ color:'white' })} />
              <CircleIcon sx={{ fontSize: 80, color: "black" }} value="black" />
              <CircleIcon sx={{ fontSize: 80, color: "#aece2d" }} value="green" />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <CircleIcon sx={{ fontSize: 80, color: "#f8ea67" }} value="yellow" />
              <CircleIcon sx={{ fontSize: 80, color: "#e0712c" }} value="orange" />
              <CircleIcon sx={{ fontSize: 80, color: "#a63d36" }} value="red" />
            </Box>
            <Box sx={{ ml: 0.5 }}>
              <CircleIcon sx={{ fontSize: 80, color: "#e37373" }} value="signature" />
            </Box>
          </Box>
        )}
        {!choose && (
          <Box sx={{ width: 250, height: 250, backgroundColor: "skyblue", p: 2, borderRadius: 5 }}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Box sx={{ width:60, height:60, border: '1px dashed grey', borderRadius: 2, mr: 1 }} />
              <Accessory src="acc/death_note.png" />
              <Accessory src="acc/death_wing.png" />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Accessory src="acc/kinky_boots.png" />
              <Accessory src="acc/mozart_hair.png" />
              <Accessory src="acc/mozart_paper.png" />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Accessory src="acc/opera_mask.png" />
              <Accessory src="acc/smileman.png" />
              <Accessory src="acc/death_apple.png" />
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

