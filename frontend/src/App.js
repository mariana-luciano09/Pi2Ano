
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
    <p>IFSP</p>
    </>
  )
};

function ListarPessoas(){
  const [pessoas, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const resposta = await axios.get('http://localhost:3333/doacao');
      setData(resposta.data);
    };
    fetchData();
  }, []);

  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #ddd' }}>
            <th style={{ padding: '8px', textAlign: 'left' }}>Nome</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map((pessoa, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '8px' }}>{pessoa.nome}</td>
              <td style={{ padding: '8px' }}>{pessoa.email}</td>
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
<ListarPessoas></ListarPessoas>
    </>
    
)
};




const CadastrarPessoa = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envia os dados para a rota usando o método POST
      await axios.post('http://localhost:3333/doacao', { nome, email });
      alert('Dados enviados com sucesso!');
      // Limpa os campos após o envio bem-sucedido
      setNome('');
      setEmail('');

    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      alert('Erro ao enviar dados. Consulte o console para mais detalhes.');
    }
  };

  return (
    <div>
      <h2>Formulário de Doação</h2>
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
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
    <h1>Cadastrar</h1>;
<CadastrarPessoa></CadastrarPessoa>
    </>
    
)
};


export default App;


