import Header from "../../components/Header";
import ResultTable from "../../components/ResultTable";
import React from "react";
import axios from "axios";
import { Table } from "antd";
import { useAuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

import "./Resultados.css";

const Resultados = (props) => {
  const { token, loadingToken, userInfo } = useAuthContext();
  const navigate = useNavigate();
  const [desafios, setDesafios] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const baseApi = "http://localhost:4000";

  React.useEffect(async () => {
    if (!loadingToken) {
      if (token === null) {
        navigate("/login");
      } else {
        axios
          .get(baseApi + "/api/games/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((gamesRes) => {
            gamesRes.data.forEach((desafio) => {
              axios
                .get(baseApi + "/api/games/" + desafio.id, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                .then((gameRes) => {
                  const element = gameRes.data;
                  axios
                    .get(baseApi + "/api/challenges/" + element.challengeID, {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    })
                    .then((challengeRes) => {
                      Object.assign(element, {
                        challengeName: challengeRes.data.name,
                        difficulty:
                          challengeRes.data.dificulty === 0
                            ? "Fácil"
                            : challengeRes.data.dificulty === 1
                            ? "Médio"
                            : "Difícil",
                        finished: gameRes.data.finshedAt !== null ? "Sim" : "Não",
                      });
                      element.userID === userInfo.id && setDesafios((desafios) => [...desafios, element])
                    });
                })
                .catch((gameErr) => {
                  console.log(gameErr);
                });
            });
            // axios para cada challengeID | Adicionar campo se foi finalizado com ou sem erros |
          })
          .catch((error) => {
            console.log(error);
          });
        setLoading(false);
      }
    }
  }, [loadingToken]);

  if (!token) {
    return <></>;
  }

  const columns = [
    {
      title: "Desafio",
      dataIndex: "challengeName",
    },
    {
      title: "Dificuldade",
      dataIndex: "difficulty",
    },
    {
      title: "Reloads",
      dataIndex: "reloads",
    },
    {
      title: "Pontuação",
      dataIndex: "score",
    },
    {
      title: "Finalizado?",
      dataIndex: "finished",
    },
  ];

  return (
    <div id="resultadosConatiner">
      <Header />
      {loading ? (
        <Spinner
          style={{ margin: "0 0 10px 0" }}
          animation="border"
          variant="info"
        />
      ) : (
        <div id="tableResultados">
          <Table
            title={() => "Resultados"}
            bordered={true}
            dataSource={desafios}
            columns={columns}
            size="medium"
            pagination={{defaultPageSize: 5}}
          />
        </div>
      )}
    </div>
  );
};

export default Resultados;
