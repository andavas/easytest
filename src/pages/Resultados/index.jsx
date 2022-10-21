import Header from "../../components/Header";
import React from 'react';
import axios from "axios";
import { useAuthContext } from "../../context/authContext"
import { RepeatOneSharp } from "@mui/icons-material";

const Resultados = () => {
    const {token, userInfo} = useAuthContext();
    const [desafios, setDesafios] = React.useState([]);
    const baseApi = "http://localhost:4000";
    React.useEffect(() => {
        axios.get(baseApi + '/api/games/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            response.data.forEach((desafio) => {
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
    }, []);
    return ( <div>
        <Header/>
    </div> );
}
 
export default Resultados;