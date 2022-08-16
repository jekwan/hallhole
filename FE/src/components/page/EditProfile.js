import React from "react";
import { Box } from "@mui/system";
import CharacterProfile from "../molecule/CharacterProfile";
import ProfileEdit from "../molecule/ProfileEdit"

export default function EditProfile(props) {

  return (
    <Box>
      <CharacterProfile></CharacterProfile>
      <ProfileEdit></ProfileEdit>
    </Box>  
  );
}
