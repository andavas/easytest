import React from "react";
import { Chip } from "@mui/material";
import logo from "../../images/logo.png";
import "./styles.css";
import FaceIcon from "@mui/icons-material/Face";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { Button, Dropdown, Menu, Typography } from "antd";

const Header = () => {
  const navigate = useNavigate();
  const { token, userInfo, clearToken, clearUserInfo, } = useAuthContext();

  const handleLogout = () => {
    clearToken();
    clearUserInfo();
    navigate("/login");
  }

  const [popperOpen, setPopperOpen] = React.useState(false);

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <Typography.Text>
              Perfil
            </Typography.Text>
          ),
        },
        {
          key: "2",
          label: (
            <Typography.Text>
              Sair
            </Typography.Text>
          ),
        }
      ]}
      onClick={({ key }) => {
        if (key === "2") {
          handleLogout();
        }
      }}
    />
  )

  return (
    <div id="headerContainer">
      <img
        src={logo}
        alt="logo easytest"
        id="imgLogo"
        onClick={() => navigate("/")}
      />
      {token && (
        <Dropdown overlay={menu} placement="bottomLeft" arrow>
          <Chip
            id="chipUser"
            icon={<FaceIcon style={{ color: "white" }} />}
            label={userInfo.name}
            onClick={() => setPopperOpen(!popperOpen)}
          />
        </Dropdown>
      )}
    </div>
  );
};

export default Header;
