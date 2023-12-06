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