import React from 'react';
import axios from "axios";
import { Table } from 'antd';
import { useAuthContext } from "../../context/authContext"
import { useNavigate } from 'react-router-dom';


  

export default function ResultTable (props) {
    const { token, loadingToken } = useAuthContext();
    const navigate = useNavigate();
    const [desafios, setDesafios] = React.useState([]);
    const baseApi = process.env.REACT_APP_BASE_API;

    React.useEffect(async () => {
        if (!loadingToken) {
          if (token === null) {
            navigate("/login");
          } else {
            axios.get(baseApi + '/api/games/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                console.log(response.data);
                response.data.data.forEach((desafio) => {
                    axios.get(baseApi + '/api/games/' + desafio.id, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }).then((response) => {
                        setDesafios(desafios => [...desafios, response.data])
                    }).catch((error) => {
                        console.log(error);
                    })
                }); console.table(desafios); // axios para cada challengeID | Adicionar campo se foi finalizado com ou sem erros | Adicionar campos para code e test corretos
            }).catch((error) => {
                console.log(error);
            })
          }
        }
      }, [loadingToken]);
    
      if (!token) {
        return <></>;
      }

    // const columns = [
    //     {
    //       title: 'Desafio',
    //       dataIndex: 'name',
    //     },
    //     {
    //       title: 'Age',
    //       dataIndex: 'age',
    //     },
    //     {
    //       title: 'Address',
    //       dataIndex: 'address',
    //     },
    //   ];
    
    return (
        <Table dataSource={desafios} />
    )}