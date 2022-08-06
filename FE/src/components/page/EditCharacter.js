import React from "react";
import { Box } from "@mui/system";
import { styled } from "@mui/system";

import ToggleButton from "../molecule/ToggleButton";
import CategoryDivider from "../atom/CategoryDivider";
import TextStyle from "../atom/Text";
import SaveCancel from "../molecule/SaveCancel";

const ToggleBox = styled(Box)`
  margin-top: 5%;
  text-align: center;
`;

export default function EditCharacter(props) {
  const [choose, setChoose] = React.useState(true);

  // function MyCharacter() {
  //   const [imagePick, setImagePick] = useState('');

  //   return (
  //     <main className="container">
  //     <input type="file" onChange={handleImageUpload} />
  //     <div className="preview">
  //       {imageSrc && <img src={imageSrc} alt="preview-img" />}
  //     </div>
  //   </main>
  //   );
  // }

  return (
    <Box>
      <Box sx={{ ml: 2 }}>
        <Box sx={{ mt: 1 }}>
          <TextStyle size="large" variant="black">
            🎨 캐릭터 꾸미기
          </TextStyle>
        </Box>
        <Box sx={{ mt: 0.5, mb: 0.5 }}>
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
          <Box sx={{ width: 300, height: 200, backgroundColor: "beige", p: 2, border: "1px", borderRadius: 5 }}>
            캐릭터가 보여질 미리보기 창입니다
          </Box>
        </Box>
      </Box>
      <ToggleBox>
        <ToggleButton
          textLeft="캐릭터 색상"
          textRight="액세서리"
          onClickLeft={() => setChoose(true)}
          onClickRight={() => setChoose(false)}
        />
      </ToggleBox>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2 }}>
        {choose && (
          <Box sx={{ width: 300, height: 300, backgroundColor: "skyblue", p: 2, border: "1px", borderRadius: 5 }}>
            여기는 캐릭터 색상이 보여질 창입니다
          </Box>
        )}
        {!choose && (
          <Box sx={{ width: 300, height: 300, backgroundColor: "skyblue", p: 2, border: "1px", borderRadius: 5 }}>
            여기는 액세서리가 보여질 창입니다
          </Box>
        )}
      </Box>
      <Box sx={{ mt: 2 }}>
        <SaveCancel></SaveCancel>
      </Box>
    </Box>
  );
}
