import React from "react";
import { Chip } from "@mui/material";
import logo from "../../images/logo.png";
import "./styles.css";
import FaceIcon from "@mui/icons-material/Face";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
    return (
    <div id="headerContainer">
      <img src={logo} alt="logo easytest" id="imgLogo" onClick={() => navigate('/')}/>
      <Chip id="chipUser" icon={<FaceIcon style={{color:'white'}}/>} label="User"/>
    </div>
  );
};

export default Header;
