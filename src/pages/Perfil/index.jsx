import React from "react";
import { Button, Form, Input, message, Radio } from "antd";
import Header from "../../components/Header";
import { useAuthContext } from "../../context/authContext";
import "./Perfil.css";
import axios from "axios";

const Perfil = () => {
  const baseApi = "http://localhost:4000";
  const { token, userInfo } = useAuthContext();
  const [name, setName] = React.useState(userInfo.name);
  const [email, setEmail] = React.useState(userInfo.email); 
  const [password, setPassword] = React.useState(""); 
  const [confirmPassword, setConfirmPassword] = React.useState(""); 

  const [form] = Form.useForm();
  
  const handleEditProfile = () => {
    console.log(baseApi + '/api/users/' + userInfo.id)
    axios.put(baseApi + '/api/users/' + userInfo.id, {
      name,
      email
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then((response) => {
      message.success('Perfil atualizado com sucesso!');
      console.log(response);
    }).catch((error) => {
      message.error('Erro ao atualizar perfil!');
      console.log(error);
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
            className="ant-item"
          >
            <Input placeholder="Nome" value={name} onChange={e => setName(e.target.value)}/>
          </Form.Item>
          <Form.Item
            label="Email"
            required
            tooltip="Requerido"
            className="ant-item"
          >
            <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Senha"
            required={password || confirmPassword !== ""}
            tooltip="Senha não será alterada se não preenchido"
            className="ant-item"
          >
            <Input.Password placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Confirmar"
            required={password || confirmPassword !== ""}
            tooltip="Senha não será alterada se não preenchido"
            className="ant-item"
          >
            <Input.Password placeholder="Confirmar Senha" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
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
