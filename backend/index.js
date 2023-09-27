const express = require('express')
const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.listen(9000, () => console.log("OK"));

const mysql = require('mysql2/promise')
const connection = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: ''
})

app.get('/', (req,res) => {
    res.send("Mariana");
})

const getAllPessoas = async ()=>{
    const [query] = await connection
    .execute('select * from testepessoa.pessoa');
    return query;
}

app.get('/pessoa', async (req,res)=>{
    const consulta  = await getAllPessoas();
    return res.status(200).json(consulta);
})

app.get('/pessoa/:id', async (req,res)=>{
    const {id} = req.params;
    const [query] = await connection.execute('select * from TestePessoa.Pessoa where id = ?', [id]);
    if(query.lenght === 0) return res.status(400).json({mensagem: 'Nao encontrado. '})
    return res.status(200).json(query);
})

app.post('/pessoa/busca/:nome', async (req,res)=>{
    const {id} = req.params;
    const [query]= await connection.execute('select * from TestePessoa.Pessoa where id = ? , [nome,email,id]')
    if(query.length === 0) return res.status(400).json({mensagem: 'Nao encontrado.'})
    return res.status(200).json(query);
})

app.post('/pessoa', async (req,res)=>{
    const {nome, email} = req.body;
    const [query]= await connection.
    execute('insert into TestePessoa.Pessoa (nome,email) values (?,?)',
    [nome,email])
    return res.status(200).json(query);
})

app.put('/pessoa/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;
  
    
    const [query] = await connection.execute(
    'UPDATE TestePessoa.Pessoa SET nome = ?, email = ? WHERE id = ?',
    [nome, email, id])
    return res.send(query)
        
});

app.delete('/pessoa/:id', async (req, res) => {
    const { id } = req.params;
    const [query] = await connection.execute(
    'DELETE from TestePessoa.Pessoa WHERE id = ?',
    [id])
    return res.send(query)
        
});

//doador
const getAllDoadores = async () => {
    const [query] = await connection.execute('SELECT * FROM doador');
    return query;
}

app.get('/doador', async (req, res) => {
    const consulta = await getAllDoadores();
    return res.status(200).json(consulta);
})

app.get('/doador/:iddoador', async (req, res) => {
    const { iddoador } = req.params;
    const [query] = await connection.execute('SELECT * FROM doador WHERE iddoador = ?', [iddoador]);
    if (query.length === 0) return res.status(400).json({ mensagem: 'Doador não encontrado.' })
    return res.status(200).json(query);
})

app.post('/doador/busca/:iddoador', async (req, res) => {
    const { iddoador } = req.params;
    const [query] = await connection.execute('SELECT * FROM doador WHERE iddoador = ?', [iddoador]);
    if (query.length === 0) return res.status(400).json({ mensagem: 'Nenhum doador encontrado.' })
    return res.status(200).json(query);
})

app.post('/doador', async (req, res) => {
    const { nome, nascimento, cpf, cep, numerocasa, uf, cidade, pais } = req.body;
    const [query] = await connection.execute(
        'INSERT INTO doador (nome, nascimento, cpf, cep, numerocasa, uf, cidade, pais) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [nome, nascimento, cpf, cep, numerocasa, uf, cidade, pais]
    );
    return res.status(200).json(query);
})

app.put('/doador/:iddoador', async (req, res) => {
    const { iddoador } = req.params;
    const { nome, nascimento, cpf, cep, numerocasa, uf, cidade, pais } = req.body;

    const [query] = await connection.execute(
        'UPDATE doador SET nome = ?, nascimento = ?, cpf = ?, cep = ?, numerocasa = ?, uf = ?, cidade = ?, pais = ? WHERE iddoador = ?',
        [nome, nascimento, cpf, cep, numerocasa, uf, cidade, pais, iddoador]
    );
    return res.status(200).json(query);
});

app.delete('/doador/:iddoador', async (req, res) => {
    const { iddoador } = req.params;
    const [query] = await connection.execute(
        'DELETE FROM doador WHERE iddoador = ?',
        [iddoador]
    );
    return res.status(200).json(query);
});


//usuario
const getAllUsuarios = async () => {
    const [query] = await connection.execute('SELECT * FROM usuario');
    return query;
}

app.get('/usuario', async (req, res) => {
    const consulta = await getAllUsuarios();
    return res.status(200).json(consulta);
})

app.get('/usuario/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;
    const [query] = await connection.execute('SELECT * FROM usuario WHERE id_usuario = ?', [id_usuario]);
    if (query.length === 0) return res.status(400).json({ mensagem: 'Usuário não encontrado.' })
    return res.status(200).json(query);
})

app.post('/pessoa/busca/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;
    const [query] = await connection.execute('SELECT * FROM TestePessoa.Pessoa WHERE id_usuario = ?', [id_usuario]);
    if (query.length === 0) return res.status(400).json({ mensagem: 'Nenhum registro encontrado.' });
    return res.status(200).json(query);
});

app.post('/usuario', async (req, res) => {
    const { identificacao, senha } = req.body;
    const [query] = await connection.execute(
        'INSERT INTO usuario (identificacao, senha) VALUES (?, ?)',
        [identificacao, senha]
    );
    return res.status(200).json(query);
})

app.put('/usuario/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;
    const { identificacao, senha } = req.body;

    const [query] = await connection.execute(
        'UPDATE usuario SET identificacao = ?, senha = ? WHERE id_usuario = ?',
        [identificacao, senha, id_usuario]
    );
    return res.status(200).json(query);
});

app.delete('/usuario/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;
    const [query] = await connection.execute(
        'DELETE FROM usuario WHERE id_usuario = ?',
        [id_usuario]
    );
    return res.status(200).json(query);
});

// doação
const getAllDoacoes = async () => {
    const [query] = await connection.execute('SELECT * FROM doacao');
    return query;
}

app.get('/doacao', async (req, res) => {
    const consulta = await getAllDoacoes();
    return res.status(200).json(consulta);
})

app.get('/doacao/:id_doacao', async (req, res) => {
    const { id_doacao } = req.params;
    const [query] = await connection.execute('SELECT * FROM doacao WHERE id_doacao = ?', [id_doacao]);
    if (query.length === 0) return res.status(400).json({ mensagem: 'Doação não encontrada.' })
    return res.status(200).json(query);
})


app.post('/usuario/busca/:id_doacao', async (req, res) => {
    const { id_doacao } = req.params;
    const [query] = await connection.execute('SELECT * FROM usuario WHERE id_doacao = ?', [id_doacao]);
    if (query.length === 0) return res.status(400).json({ mensagem: 'Nenhum usuário encontrado.' })
    return res.status(200).json(query);
})

app.post('/doacao', async (req, res) => {
    const { valor, data, doador_iddoador, cartao_numerocartao, campanha_id, status, tipo } = req.body;
    const [query] = await connection.execute(
        'INSERT INTO doacao (valor, data, doador_iddoador, cartao_numerocartao, campanha_id, status, tipo) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [valor, data, doador_iddoador, cartao_numerocartao, campanha_id, status, tipo]
    );
    return res.status(200).json(query);
})


app.put('/doacao/:id_doacao', async (req, res) => {
    const { id_doacao } = req.params;
    const { valor, data, doador_iddoador, cartao_numerocartao, campanha_id, status, tipo } = req.body;

    const [query] = await connection.execute(
        'UPDATE doacao SET valor = ?, data = ?, doador_iddoador = ?, cartao_numerocartao = ?, campanha_id = ?, status = ?, tipo = ? WHERE id_doacao = ?',
        [valor, data, doador_iddoador, cartao_numerocartao, campanha_id, status, tipo, id_doacao]
    );
    return res.status(200).json(query);
});


app.delete('/doacao/:id_doacao', async (req, res) => {
    const { id_doacao } = req.params;
    const [query] = await connection.execute(
        'DELETE FROM doacao WHERE id_doacao = ?',
        [id_doacao]
    );
    return res.status(200).json(query);
});


// configurações
const getAllConfiguracoes = async () => {
    const [query] = await connection.execute('SELECT * FROM configuracoes');
    return query;
}

app.get('/configuracoes', async (req, res) => {
    const consulta = await getAllConfiguracoes();
    return res.status(200).json(consulta);
})

app.get('/configuracoes/:nomeinstituicao', async (req, res) => {
    const { nomeinstituicao } = req.params;
    const [query] = await connection.execute('SELECT * FROM configuracoes WHERE nomeinstituicao = ?', [nomeinstituicao]);
    if (query.length === 0) return res.status(400).json({ mensagem: 'Configuração não encontrada.' })
    return res.status(200).json(query);
})

app.post('/configuracoes/busca/:nomeinstituicao', async (req,res)=>{
    const {nomeinstituicao} = req.params;
    const [query]= await connection.execute('select * from configuracoes where nomeinstituicao = ? , [nomeinstituicao]')
    if(query.length === 0) return res.status(400).json({mensagem: 'Nao encontrado.'})
    return res.status(200).json(query);
})

app.post('/configuracoes', async (req, res) => {
    const { nomeinstituicao, emailinstituicao, multas } = req.body;
    const [query] =  await connection.execute('INSERT INTO configuracoes (nomeinstituicao, emailinstituicao, multas) VALUES (?, ?, ?)',
            [nomeinstituicao, emailinstituicao, multas])
    return res.status(200).json(query);   
})


app.put('/configuracoes', async (req, res) => {
    const { nomeinstituicao, emailinstituicao, multas } = req.body;
    const [query] = await connection.execute(
        'UPDATE configuracoes SET nomeinstituicao = ?, emailinstituicao = ?, multas = ?',
        [nomeinstituicao, emailinstituicao, multas]
    );
    return res.status(200).json(query);
});

app.delete('/configuracoes/:nomeinstituicao', async (req, res) => {
    const { nomeinstituicao } = req.params;
    const [query] = await connection.execute(
        'DELETE FROM configuracoes WHERE nomeinstituicao = ?', 
        [nomeinstituicao])
    return res.send(query)
});

// campanha
const getAllCampanhas = async () => {
    const [query] = await connection.execute('SELECT * FROM campanha');
    return query;
}

app.get('/campanha', async (req, res) => {
    const consulta = await getAllCampanhas();
    return res.status(200).json(consulta);
})

app.get('/campanha/:id_campanha', async (req,res)=>{
    const {id_camapanha} = req.params;
    const [query] = await connection.execute('select * from campanha where id_campanha = ?', [id_campanha]);
    if(query.lenght === 0) return res.status(400).json({mensagem: 'Nao encontrado. '})
    return res.status(200).json(query);
})

app.post('/campanha/busca/:id_campanha', async (req,res)=>{
    const {id_campanha} = req.params;
    const [query]= await connection.execute('select * from campanha where id_campanha = ?' , [id_campanha])
    if(query.length === 0) return res.status(400).json({mensagem: 'Nao encontrado.'})
    return res.status(200).json(query);
})

app.post('/campanha', async (req, res) => {
    const {
        id_usuario,
        titulocampanha,
        descricao,
        datainicio,
        datatermino,
        valormeta,
        imagem1,
        imagem2,
        imagem3,
        imagem4,
        imagem5,
        imagem6,
        imagem7,
        imagem8,
        background,
        logo,
        texto1,
        texto2,
        texto3,
        texto4,
        texto5
    } = req.body;

    const [query] = await connection.execute(
        'INSERT INTO campanha (id_usuario, titulocampanha, descricao, datainicio, datatermino, valormeta, imagem1, imagem2, imagem3, imagem4, imagem5, imagem6, imagem7, imagem8, background, logo, texto1, texto2, texto3, texto4, texto5) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
            id_usuario,
            titulocampanha,
            descricao,
            datainicio,
            datatermino,
            valormeta,
            imagem1,
            imagem2,
            imagem3,
            imagem4,
            imagem5,
            imagem6,
            imagem7,
            imagem8,
            background,
            logo,
            texto1,
            texto2,
            texto3,
            texto4,
            texto5
        ]
    );
    return res.status(200).json(query);
})

app.put('/campanha/:id_campanha', async (req, res) => {
    const { id_campanha } = req.params;
    const {
        id_usuario,
        titulocampanha,
        descricao,
        datainicio,
        datatermino,
        valormeta,
        imagem1,
        imagem2,
        imagem3,
        imagem4,
        imagem5,
        imagem6,
        imagem7,
        imagem8,
        background,
        logo,
        texto1,
        texto2,
        texto3,
        texto4,
        texto5
    } = req.body;

    const [query] = await connection.execute(
        'UPDATE campanha SET id_usuario = ?, titulocampanha = ?, descricao = ?, datainicio = ?, datatermino = ?, valormeta = ?, imagem1 = ?, imagem2 = ?, imagem3 = ?, imagem4 = ?, imagem5 = ?, imagem6 = ?, imagem7 = ?, imagem8 = ?, background = ?, logo = ?, texto1 = ?, texto2 = ?, texto3 = ?, texto4 = ?, texto5 = ? WHERE id_campanha = ?',
        [
            id_usuario,
            titulocampanha,
            descricao,
            datainicio,
            datatermino,
            valormeta,
            imagem1,
            imagem2,
            imagem3,
            imagem4,
            imagem5,
            imagem6,
            imagem7,
            imagem8,
            background,
            logo,
            texto1,
            texto2,
            texto3,
            texto4,
            texto5,
            id_campanha
        ]
    );
    return res.status(200).json(query);
});

app.delete('/campanha/:id_campanha', async (req, res) => {
    const { id_campanha } = req.params;
    const [query] = await connection.execute(
        'DELETE FROM campanha WHERE id_campanha = ?',
        [id_campanha]
    );
    return res.status(200).json(query);
});



