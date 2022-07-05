def soma(a, b):
    return (a + b)

def func(content):
    return content

a, b = 5, 7
#a = int(input('Enter 1st number: '))
#c = int(input('Enter 2nd number: '))


import sys, io

import unittest
import __main__

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
            result = soma(a,b)


suite = unittest.TestLoader().loadTestsFromModule(__main__)
old_stdout = sys.stdout
new_stdout = io.StringIO()
sys.stdout = new_stdout
unittest.TextTestRunner(stream=new_stdout).run(suite)
output = new_stdout.getvalue()
sys.stdout = old_stdout
func('aa'+output)

