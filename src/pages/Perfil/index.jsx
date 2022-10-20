import React from "react";
import { Button, Form, Input, Radio } from "antd";
import Header from "../../components/Header";
import { useAuthContext } from "../../context/authContext";
import "./Perfil.css";
import axios from "axios";

const Perfil = () => {
  const baseApi = "http://localhost:4000";
  const { token, userInfo } = useAuthContext();
  const [name, setName] = React.useState(userInfo.name);
  const [email, setEmail] = React.useState(userInfo.email); 
  const [form] = Form.useForm();
  
  const handleEditProfile = () => {
    axios.put(baseApi + '/api/users/' + userInfo.id, {
      name,
      email
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }

  return (
    <>
      <Header />
      <div id="profileContainer">
        <span id="profileTitle">Perfil</span>
        <Form id="profileInfo">
          <Form.Item
            label="Nome"
            required
            tooltip="Requerido"
          >
            <Input placeholder="Nome" value={name} onChange={e => setName(e.target.value)}/>
          </Form.Item>
          <Form.Item
            label="Email"
            required
            tooltip="Requerido"
          >
            <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType="submit" onClick={handleEditProfile}>Editar</Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Perfil;
