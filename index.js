const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 4000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'harrypotter',
  password: 'ds564',
  port: 7007,
});

app.use(express.json());


//Bruxos
app.get('/bruxos', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM bruxos');
        res.status(200).json(resultado.rows);
    } catch (error) {
        console.error('Erro ao buscar bruxos', error.message);
        res.status(500).json({ message: error.message });
    }
});

app.post('/bruxos', async (req, res) => {
    const { nome, idade, casa, habilidade, sangue, patrono } = req.body;
    const query = `INSERT INTO bruxos (nome, idade, casa, habilidade, sangue, patrono) VALUES ($1, $2, $3, $4, $5, $6)`;
    const values = [nome, idade, casa, habilidade, sangue, patrono];

   let casas = ['Grifinória', 'Sonserina', 'Corvinal', 'Lufa-Lufa']
   let sangues = ['Puro', 'Mestiço', 'Trouxa']
   let patronos = ['Cao', 'Gato', 'Rato', 'Leão', 'Cervo', 'Coruja', 'Cavalo', 'Lobo', 'Raposa', 'Cisne', 'Bode', 'Tigre', 'Fenix', 
   'Cobra', 'Girafa', 'Golfinho', 'Elefante', 'Papagaio', 'Pato', 'Pombo', 'Puma', 'Rena', 'Tartaruga', 'Tubarão', 'Urso', 'Veado']

   if (!casas.includes(casa)){
         res.status(400).send({message: 'Casa deve ser Grifinória, Sonserina, Corvinal ou Lufa-Lufa'})
   }
    if (!sangues.includes(sangue)){
        res.status(400).send({message: 'Sangue deve ser Puro, Mestiço ou Trouxa'})
    }
    if (!patronos.includes(patrono)){
        res.status(400).send({message: 'Patrono deve ser Cao, Gato, Rato, Leão, Cervo, Coruja, Cavalo, Lobo, Raposa, Cisne, Bode, Tigre, Fenix, Cobra, Girafa, Golfinho, Elefante, Papagaio, Pato, Pombo, Puma, Rena, Tartaruga, Tubarão, Urso ou Veado'})
    }

    try {
        const resultado = await pool.query(query, values);
        res.send(201, 'Bruxo adicionado com sucesso')
    } catch (error) {
        console.error('Erro ao inserir bruxo', error.message);
        res.status(500).send({ message: error.message });
    }
});

app.delete('/bruxos/:id', async (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM bruxos WHERE id = $1`;
    const values = [id];

    try {
        const resultado = await pool.query(query, values);
        res.status(200).send({ message: 'Bruxo deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar bruxo', error.message);
        res.status(500).send({ message: error.message });
    }
});

app.put('/bruxos/:id', async (req, res) => {
    const id = req.params.id;
    const { nome, idade, casa, habilidade, sangue, patrono } = req.body;
    const query = `UPDATE bruxos SET nome = $1, idade = $2, casa = $3, habilidade = $4, sangue = $5, patrono = $6 WHERE id = $7`;
    const values = [nome, idade, casa, habilidade, sangue, patrono, id];

    try {
        const resultado = await pool.query(query, values);
        res.status(200).send({ message: 'Bruxo atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar bruxo', error.message);
        res.status(500).send({ message: error.message });
    }
});

app.get('/bruxos/:id', async (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM bruxos WHERE id = $1`;
    const values = [id];

    try {
        const resultado = await pool.query(query, values);
        res.status(200).send(resultado.rows);
    } catch (error) {
        console.error('Erro ao buscar bruxo', error.message);
        res.status(500).send({ message: error.message });
    }
});

app.get('/bruxos/nome/:nome', async (req, res) => {
    const nome = req.params.nome;
    const query = `SELECT * FROM bruxos WHERE nome LIKE $1`;
    const values = [`%${nome}%`]; 

    try {
        const resultado = await pool.query(query, values);
        res.status(200).send(resultado.rows);
    } catch (error) {
        console.error('Erro ao buscar bruxos', error.message);
        res.status(500).send({ message: error.message });
    }
});


//Varinhas
app.get('/varinha', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM varinha');
        res.status(200).send(resultado.rows);
    } catch (error) {
        console.error('Erro ao buscar varinhas', error.message);
        res.status(500).send({ message: error.message });
    }
});

app.post('/varinha', async (req, res) => {
    const { material, nucleo, comprimento, fabricacao} = req.body;
    const query = `INSERT INTO varinha (material, nucleo, comprimento, fabricacao) VALUES ($1, $2, $3, $4)`;
    const values = [material, nucleo, comprimento, fabricacao];

    let materiais = ["Azevinho","Teixo","Salgueiro","Videira","Vim","Cerejeira","Carvalho","Freixo","Bétula","Louro","Faia","Sabugueiro","Espinheiro","Olmo","Chifre de Unicórnio","Pelo de Rabo de Testrálio","Pena de Fênix","Fibra do Coração de Dragão"]
    var nucleos = ["Pena de Fênix", "Cabelo de Veela", "Pelo de Rabo de Testrálio", "Dente de Serpente", "Pêlo de cauda de unicórnio", "Cabelo de Veado", "Escama de Dragão", "Pena de Hipogrifo", "Cabelo de Coração de Dragão", "Fibra do Coração de Dragão", "Cabelo de Sereiano", "Cabelo de Demiguise", "Cabelo de Thestral", "Rabo de Testrálio", "Pena de Fada", "Fibra de Veela", "Cabelo de Kelpie"];
    
    if (!materiais.includes(material)){
        res.status(400).send({message: 'Material deve ser Azevinho, Teixo, Salgueiro, Videira, Vim, Cerejeira, Carvalho, Freixo, Bétula, Louro, Faia, Sabugueiro, Espinheiro, Olmo, Chifre de Unicórnio, Pelo de Rabo de Testrálio, Pena de Fênix ou Fibra do Coração de Dragão'})
    }
    if (!nucleos.includes(nucleo)){
        res.status(400).send({message: 'Núcleo deve ser Pena de Fênix, Cabelo de Veela, Pelo de Rabo de Testrálio, Dente de Serpente, Pêlo de cauda de unicórnio, Cabelo de Veado, Escama de Dragão, Pena de Hipogrifo, Cabelo de Coração de Dragão, Fibra do Coração de Dragão, Cabelo de Sereiano, Cabelo de Demiguise, Cabelo de Thestral, Rabo de Testrálio, Pena de Fada, Fibra de Veela ou Cabelo de Kelpie'})
    }

    try {
        const resultado = await pool.query(query, values);
        res.status(201).send({ message: 'Varinha adicionada com sucesso' });
    } catch (error) {
        console.error('Erro ao adicionar varinha', error.message);
        res.status(500).send({ message: error.message });
    }
});

app.delete('/varinha/:id', async (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM varinha WHERE id = $1`;
    const values = [id];

    try {
        const resultado = await pool.query(query, values);
        res.status(200).send({ message: 'Varinha deletada com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar varinha', error.message);
        res.status(500).send({ message: error.message });
    }
});

app.put('/varinha/:id', async (req, res) => {
    const id = req.params.id;
    const { material, nucleo, comprimento, fabricacao } = req.body;
    const query = `UPDATE varinha SET material = $1, nucleo = $2, comprimento = $3, fabricacao = $4 WHERE id = $5`;
    const values = [material, nucleo, comprimento, fabricacao, id];

    try {
        const resultado = await pool.query(query, values);
        res.status(200).send({ message: 'Varinha atualizada com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar varinha', error.message);
        res.status(500).send({ message: error.message });
    }
});

app.get('/varinha/:id', async (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM varinha WHERE id = $1`;
    const values = [id];

    try {
        const resultado = await pool.query(query, values);
        res.status(200).json(resultado.rows);
    } catch (error) {
        console.error('Erro ao buscar varinha', error.message);
        res.status(500).json({ message: error.message });
    }
});

app.get('/', (req, res) => {
    res.send('Bem vindo a hogwarts 🧙‍♂️🧙‍♀️');
});

app.listen(PORT, () => {
    console.log(`Servidor Funcionando 🎇🎉 ${PORT}`);
});