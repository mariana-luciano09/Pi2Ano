
 import axios from 'axios';
 import React, { useState, useEffect } from "react";


import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Outlet, Link } from "react-router-dom";



function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="listar" element={<Listar />} />
          <Route path="cadastrar" element={<Cadastrar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

}

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/listar">Listar</Link>
          </li>
          <li>
            <Link to="/cadastrar">Cadastrar</Link>
          </li>
        </ul>
      </nav>
      <hr></hr>

      <Outlet />
    </>
  )
};

const Home = () => {
  return(
    <>
    <h1>Home</h1>
    <p>Página de Doações</p>
    </>
  )
};

function ListarDoadores() {
  const [doadores, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const resposta = await axios.get('http://localhost:9000/doador'); // Modifique a rota para apropriada, deve ser algo como 'http://localhost:3333/doador'
        console.log(resposta.data)
        setData(resposta.data);
    };
    fetchData();
  }, []);

  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr style={{ borderBottom: '1px solid #ddd' }}>
          <th style={{ padding: '8px', textAlign: 'left' }}>Nome</th>
          <th style={{ padding: '8px', textAlign: 'left' }}>Data de Nascimento</th>
          <th style={{ padding: '8px', textAlign: 'left' }}>CPF</th>
          <th style={{ padding: '8px', textAlign: 'left' }}>Valor</th>
          <th style={{ padding: '8px', textAlign: 'left' }}>UF</th>
          <th style={{ padding: '8px', textAlign: 'left' }}>Cidade</th>
          <th style={{ padding: '8px', textAlign: 'left' }}>País</th>
        </tr>
      </thead>
      <tbody>
        {doadores.map((doador, index) => (
          <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
            <td style={{ padding: '8px' }}>{doador.nome}</td>
            <td style={{ padding: '8px' }}>{new Date(doador.nascimento).toLocaleDateString('pt-BR')}</td>
            <td style={{ padding: '8px' }}>{doador.cpf}</td>
            <td style={{ padding: '8px' }}>{doador.valor}</td>
            <td style={{ padding: '8px' }}>{doador.uf}</td>
            <td style={{ padding: '8px' }}>{doador.cidade}</td>
            <td style={{ padding: '8px' }}>{doador.pais}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}




const Listar = () => {
  return (
    <>
    <h1>Listar</h1>
    <ListarDoadores></ListarDoadores>
    </>
    
)
};




const CadastrarDoador = () => {
  const [nome, setNome] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [valor, setValor] = useState('');
  const [uf, setUf] = useState('');
  const [cidade, setCidade] = useState('');
  const [pais, setPais] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { nome, nascimento, cpf, valor, uf, cidade, pais };
    console.log(data);

    try {
      // Envia os dados para a rota usando o método POST
      await axios.post('http://localhost:9000/doador', {
        nome,
        nascimento,
        cpf,
        valor,
        uf,
        cidade,
        pais
      });

      alert('Dados enviados com sucesso!');

      // Limpa os campos após o envio bem-sucedido
      setNome('');
      setNascimento('');
      setCpf('');
      setValor('');
      setUf('');
      setCidade('');
      setPais('');
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      alert('Erro ao enviar dados. Consulte o console para mais detalhes.');
    }
  };

  return (
    <div>
      <h2>Formulário de Doações</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Data de Nascimento:
          <input
            type="date"
            value={nascimento}
            onChange={(e) => setNascimento(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          CPF:
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Valor:
          <input
            type="text"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          UF:
          <input
            type="text"
            value={uf}
            onChange={(e) => setUf(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Cidade:
          <input
            type="text"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          País:
          <input
            type="text"
            value={pais}
            onChange={(e) => setPais(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};


const Cadastrar = () => {
   
  return (
    <>
    <h1>Cadastrar</h1>
    <CadastrarDoador></CadastrarDoador>
    </>
    
)
};


export default App;


