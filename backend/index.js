const express = require('express')
const app = express();
const cors = require('cors');

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors());

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


//doador
const getAllDoadores = async () => {
    const [query] = await connection.execute('SELECT * FROM sistema.doador');
    return query;
}

app.get('/doador', async (req, res) => {
    const consulta = await getAllDoadores();
    return res.status(200).json(consulta);
})

app.post('/doador', async (req, res) => {
    const { nome, nascimento, cpf, valor, uf, cidade, pais } = req.body;
    const [query] = await connection.execute(
        'INSERT INTO sistema.doador (nome, nascimento, cpf, valor, uf, cidade, pais) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [nome, nascimento, cpf, valor, uf, cidade, pais]
    );
    return res.status(200).json(query);
})

app.get('/doador/:iddoador', async (req, res) => {
    const { iddoador } = req.params;
    const [query] = await connection.execute('SELECT * FROM sistema.doador WHERE iddoador = ?', [iddoador]);
    if (query.length === 0) return res.status(400).json({ mensagem: 'Doador não encontrado.' })
    return res.status(200).json(query);
})

app.post('/doador/busca/:iddoador', async (req, res) => {
    const { iddoador } = req.params;
    const [query] = await connection.execute('SELECT * FROM sistema.doador WHERE iddoador = ?', [iddoador]);
    if (query.length === 0) return res.status(400).json({ mensagem: 'Nenhum doador encontrado.' })
    return res.status(200).json(query);
})


app.put('/doador/:iddoador', async (req, res) => {
    const { iddoador } = req.params;
    const { nome, nascimento, cpf, valor, uf, cidade, pais } = req.body;

    const [query] = await connection.execute(
        'UPDATE sistema.doador SET nome = ?, nascimento = ?, cpf = ?, valor = ?, uf = ?, cidade = ?, pais = ? WHERE iddoador = ?',
        [nome, nascimento, cpf, valor, uf, cidade, pais, iddoador]
    );
    return res.status(200).json(query);
});

app.delete('/doador/:iddoador', async (req, res) => {
    const { iddoador } = req.params;
    const [query] = await connection.execute(
        'DELETE FROM sistema.doador WHERE iddoador = ?',
        [iddoador]
    );
    return res.status(200).json(query);
});


//usuario
const getAllUsuarios = async () => {
    const [query] = await connection.execute('SELECT * FROM sistema.usuario');
    return query;
}

app.get('/usuario', async (req, res) => {
    const consulta = await getAllUsuarios();
    return res.status(200).json(consulta);
})

app.get('/usuario/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;
    const [query] = await connection.execute('SELECT * FROM sistema.usuario WHERE id_usuario = ?', [id_usuario]);
    if (query.length === 0) return res.status(400).json({ mensagem: 'Usuário não encontrado.' })
    return res.status(200).json(query);
})

app.post('/usuario/busca/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;
    const [query] = await connection.execute('SELECT * FROM sistema.usuario WHERE id_usuario = ?', [id_usuario]);
    if (query.length === 0) return res.status(400).json({ mensagem: 'Nenhum registro encontrado.' });
    return res.status(200).json(query);
});

app.post('/usuario', async (req, res) => {
    const { identificacao, senha } = req.body;
    const [query] = await connection.execute(
        'INSERT INTO sistema.usuario (identificacao, senha) VALUES (?, ?)',
        [identificacao, senha]
    );
    return res.status(200).json(query);
})

app.put('/usuario/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;
    const { identificacao, senha } = req.body;

    const [query] = await connection.execute(
        'UPDATE sistema.usuario SET identificacao = ?, senha = ? WHERE id_usuario = ?',
        [identificacao, senha, id_usuario]
    );
    return res.status(200).json(query);
});

app.delete('/usuario/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;
    const [query] = await connection.execute(
        'DELETE FROM sistema.usuario WHERE id_usuario = ?',
        [id_usuario]
    );
    return res.status(200).json(query);
});

// doação
const getAllDoacoes = async () => {
    const [query] = await connection.execute('SELECT * FROM sistema.doacao');
    return query;
}

app.get('/doacao', async (req, res) => {
    const consulta = await getAllDoacoes();
    return res.status(200).json(consulta);
})

app.get('/doacao/:id_doacao', async (req, res) => {
    const { id_doacao } = req.params;
    const [query] = await connection.execute('SELECT * FROM sistema.doacao WHERE id_doacao = ?', [id_doacao]);
    if (query.length === 0) return res.status(400).json({ mensagem: 'Doação não encontrada.' })
    return res.status(200).json(query);
})


app.post('/doacao/busca/:id_doacao', async (req, res) => {
    const { id_doacao } = req.params;
    const [query] = await connection.execute('SELECT * FROM sistema.doacao WHERE id_doacao = ?', [id_doacao]);
    if (query.length === 0) return res.status(400).json({ mensagem: 'Nenhuma doação encontrada.' })
    return res.status(200).json(query);
})

app.post('/doacao', async (req, res) => {
    const { valor, data, iddoador, cartao_numerocartao, id_campanha, status, tipo } = req.body;
    const [query] = await connection.execute(
        'INSERT INTO sistema.doacao (valor, data, iddoador, cartao_numerocartao, id_campanha, status, tipo) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [valor, data, iddoador, cartao_numerocartao, id_campanha, status, tipo]
    );
    return res.status(200).json(query);
})


app.put('/doacao/:id_doacao', async (req, res) => {
    const { id_doacao } = req.params;
    const { valor, data, iddoador, cartao_numerocartao, id_campanha, status, tipo } = req.body;

    const [query] = await connection.execute(
        'UPDATE sistema.doacao SET valor = ?, data = ?, iddoador = ?, cartao_numerocartao = ?, id_campanha = ?, status = ?, tipo = ? WHERE id_doacao = ?',
        [valor, data, iddoador, cartao_numerocartao, id_campanha, status, tipo, id_doacao]
    );
    return res.status(200).json(query);
});


app.delete('/doacao/:id_doacao', async (req, res) => {
    const { id_doacao } = req.params;
    const [query] = await connection.execute(
        'DELETE FROM sistema.doacao WHERE id_doacao = ?',
        [id_doacao]
    );
    return res.status(200).json(query);
});


// configurações
const getAllConfiguracoes = async () => {
    const [query] = await connection.execute('SELECT * FROM sistema.configuracoes');
    return query;
}

app.get('/configuracoes', async (req, res) => {
    const consulta = await getAllConfiguracoes();
    return res.status(200).json(consulta);
})

app.get('/configuracoes/:nomeinstituicao', async (req, res) => {
    const { nomeinstituicao } = req.params;
    const [query] = await connection.execute('SELECT * FROM sistema.configuracoes WHERE nomeinstituicao = ?', [nomeinstituicao]);
    if (query.length === 0) return res.status(400).json({ mensagem: 'Configuração não encontrada.' })
    return res.status(200).json(query);
})

app.post('/configuracoes/busca/:nomeinstituicao', async (req,res)=>{
    const {nomeinstituicao} = req.params;
    const [query]= await connection.execute('select * from sistema.configuracoes where nomeinstituicao = ?' , [nomeinstituicao])
    if(query.length === 0) return res.status(400).json({mensagem: 'Nao encontrado.'})
    return res.status(200).json(query);
})

app.post('/configuracoes', async (req, res) => {
    const { nomeinstituicao, emailinstituicao, multas } = req.body;
    const [query] =  await connection.execute('INSERT INTO sistema.configuracoes (nomeinstituicao, emailinstituicao, multas) VALUES (?, ?, ?)',
            [nomeinstituicao, emailinstituicao, multas])
    return res.status(200).json(query);  
})


app.put('/configuracoes', async (req, res) => {
    const { nomeinstituicao, emailinstituicao, multas } = req.body;
    const [query] = await connection.execute(
        'UPDATE sistema.configuracoes SET nomeinstituicao = ?, emailinstituicao = ?, multas = ?',
        [nomeinstituicao, emailinstituicao, multas]
    );
    return res.status(200).json(query);
});

app.delete('/configuracoes/:nomeinstituicao', async (req, res) => {
    const { nomeinstituicao } = req.params;
    const [query] = await connection.execute(
        'DELETE FROM sistema.configuracoes WHERE nomeinstituicao = ?',
        [nomeinstituicao])
    return res.send(query)
});


// campanha
const getAllCampanhas = async () => {
    const [query] = await connection.execute('SELECT * FROM sistema.campanha');
    return query;
}

app.get('/campanha', async (req, res) => {
    const consulta = await getAllCampanhas();
    return res.status(200).json(consulta);
})

app.get('/campanha/:id_campanha', async (req,res)=>{
    const {id_camapanha} = req.params;
    const [query] = await connection.execute('select * from sistema.campanha where id_campanha = ?', [id_campanha]);
    if(query.lenght === 0) return res.status(400).json({mensagem: 'Nao encontrado. '})
    return res.status(200).json(query);
})

app.post('/campanha/busca/:id_campanha', async (req,res)=>{
    const {id_campanha} = req.params;
    const [query]= await connection.execute('select * from sistema.campanha where id_campanha = ?' , [id_campanha])
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
        'INSERT INTO sistema.campanha (id_usuario, titulocampanha, descricao, datainicio, datatermino, valormeta, imagem1, imagem2, imagem3, imagem4, imagem5, imagem6, imagem7, imagem8, background, logo, texto1, texto2, texto3, texto4, texto5) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
        'UPDATE sistema.campanha SET id_usuario = ?, titulocampanha = ?, descricao = ?, datainicio = ?, datatermino = ?, valormeta = ?, imagem1 = ?, imagem2 = ?, imagem3 = ?, imagem4 = ?, imagem5 = ?, imagem6 = ?, imagem7 = ?, imagem8 = ?, background = ?, logo = ?, texto1 = ?, texto2 = ?, texto3 = ?, texto4 = ?, texto5 = ? WHERE id_campanha = ?',
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
        'DELETE FROM sistema.campanha WHERE id_campanha = ?',
        [id_campanha]
    );
    return res.status(200).json(query);
});



