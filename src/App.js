import { Button, Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'

const desafio1 = {
  nome: 'Código com erro',
  dificuldade: 'Fácil',
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
              result = soma(a,b)`
}

export default function App() {
  const navigate = useNavigate();

  const handleChallengeSelect = () => {
    navigate('/desafio',{state: {desafio: desafio1}})
  }


    return ( <div className='App'>

    <Card>
      <CardContent>
        <Typography>
        {desafio1.dificuldade}
        </Typography>
        <Typography>
        Sua pontuação: {desafio1.pontuacao}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleChallengeSelect}>
          Jogar
        </Button>
      </CardActions>
    </Card>

        {/* <Card title={desafio1.nome} bordered={true} onClick={handleChallengeSelect}>
          <p><br/></p>
          <p>
            
          </p>
          <p>
            
          </p>
        </Card> */}
    </div>
    );
}