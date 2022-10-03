import React from "react";
import "./App.css";
import ListaDesafios from "./components/Desafios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { LineAxisOutlined } from "@mui/icons-material";
import axios from "axios";
import { useAuthContext } from "./context/authContext";
import { useNavigate } from "react-router-dom";

const desafios = [
  {
    nome: "Código com erro",
    dificuldade: "Fácil",
    pontuacao: 0,
    tempo: 0,
    reloads: 0,
    code: `
    def soma(a, b):
    return (a + b)

  a, b = 5, 7
  #a = int(input('Enter 1st number: '))
  #c = int(input('Enter 2nd number: '))

  print(f'Soma de {a} e {b} é {soma(a, b)}')
    `,
    test: `
    class TestSum(unittest.TestCase):
        def test_list_int(self):
            """
            Testa se consegue somar dois números positivos
            """
            a, b = 2, 5
            result = soma(a,b)
            self.assertEqual(result, 7)
    
        def test_list_neg_int(self):
            """
            Testa se consegue somar dois números negativos
            """
            a,b = -2, -8
            result = soma(a,b)
            self.assertEqual(result, -10)
    
        def test_bad_type(self):
            a,b = 'banana', 3
            with self.assertRaises(TypeError):
                result = soma(a,b)`,
  },
  {
    nome: "Teste com erro",
    dificuldade: "Fácil",
    pontuacao: 1,
    tempo: 0,
    reloads: 0,
    code: `
    def soma(a, b):
    return (a + b)
  
  a, b = 5, 7
  #a = int(input('Enter 1st number: '))
  #c = int(input('Enter 2nd number: '))
  
  print(f'Soma de {a} e {b} é {soma(a, b)}')
    `,
    test: `
    class TestSum(unittest.TestCase):
        def test_list_int(self):
            """
            Testa se consegue somar dois números positivos
            """
            a, b = 2, 5
            result = soma(a,b)
            self.assertEqual(result, 7)
    
        def test_list_neg_int(self):
            """
            Testa se consegue somar dois números negativos
            """
            a,b = -2, -8
            result = soma(a,b)
            self.assertEqual(result, -10)
    
        def test_bad_type(self):
            a,b = 'banana', 3
            with self.assertRaises(TypeError):
                result = soma(a,b)`,
  },
];

export default function App() {
  // const api = 'http://localhost:4000/api/challenges'
  // React.useEffect(() => {
  //   axios.get(api,{
  //     headers:{
  //       Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZGVzb25iQG1haWwuY29tIiwiaWF0IjoxNjYzMjA4MjYyLCJleHAiOjE2NjMyMTE4NjJ9.R29qqUrxUkfPECYB8UsYkCW70k3zYwG7dGf65UR0TEc'
  //     }
  //   }).then(response => console.log(response.data))
  // },[])

  const {loadingToken, token} = useAuthContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loadingToken) {
      if (token === null) {
        navigate("/login");
      }
    }
  }, []); 

  if (!token) {
    return <></>;
  }

  return (
    <div className="App">
      <Header/>
      <div>
        Testes
      </div>
      <ListaDesafios desafios={desafios}/>
      <Footer/>
    </div>
  );
}
