import React from "react";
import { Chip } from "@mui/material";
import logo from "../../images/logo.png";
import "./styles.css";
import FaceIcon from "@mui/icons-material/Face";

const Header = () => {
  return (
    <div id="headerContainer">
      <img src={logo} alt="logo easytest" id="imgLogo" />
      <Chip id="chipUser" icon={<FaceIcon style={{color:'white'}}/>} label="User"/>
    </div>
  );
};

export default Header;
