import React from "react";
import Text from "../atom/Text";
import Box from "@mui/material/Box";
import Logo from "../atom/Logo";
import Icon from "@mui/material/Icon";
import { Button } from "@mui/material";

const allCustom = {
  width: "100vw",
  height: "100vh",
  backgroundColor: "black",
};

const emptyBox = { height: "250px" };

const logoStyle = { textAlign: "center", marginTop: 5 };

const resetpasswordBox = { textAlign: "center", marginTop: 5 };

export default function ForgotPassword() {
  return (
    <Box sx={allCustom}>
      <Box>
        <Box sx={emptyBox}></Box>
        <Box sx={{ position: "absolute", marginTop: -25 }}>
          <Button>
            <Icon sx={{ color: "white" }}>close</Icon>
          </Button>
        </Box>
        <Box sx={resetpasswordBox}>
          <Text variant="white" size="small">
            SUCESS!
          </Text>
        </Box>
        <Box sx={logoStyle}>
          <Logo size="large" src="logo.png"></Logo>
        </Box>
      </Box>
      <Box sx={resetpasswordBox}>
        <Text variant="white" size="small">
          Check your email to <br /> reset your passWord
        </Text>
      </Box>
    </Box>
  );
}
