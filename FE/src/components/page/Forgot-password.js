import React from "react";
import Text from "../atom/Text";
import Box from "@mui/material/Box";
import Input from "../atom/Input";
import Button from "../atom/Button";
import Logo from "../atom/Logo";

const allCustom = {
  width: "100vw",
  height: "100vh",
  backgroundColor: "black",
};

const emptyBox = { height: "50px" };

const logoStyle = { textAlign: "center", marginTop: 8 };

const resetpasswordBox = { textAlign: "center", marginRight: "55%", marginTop: 10, marginBottom: 2 };

const passwordBox = { textAlign: "center", marginTop: 3 };

export default function ForgotPassword() {
  return (
    <Box sx={allCustom}>
      <Box>
        <Box sx={emptyBox}></Box>
        <Box sx={logoStyle}>
          <Logo size="large" src="logo.png"></Logo>
        </Box>
      </Box>
      <Box sx={resetpasswordBox}>
        <Text variant="white" size="small">
          RESET PASSWORD
        </Text>
      </Box>
      <Box sx={passwordBox}>
        <Box sx={{ color: "white" }}>
          <Input size="large" label="Enter email"></Input>
        </Box>
        <Box sx={{ marginTop: 6 }}>
          <Button variant="primary" size="large" color="black">
            RESET PASSWORD
          </Button>
        </Box>
        <Box sx={{ marginTop: 1 }}>
          <Button variant="primary" size="large" color="black">
            CANCEL
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
