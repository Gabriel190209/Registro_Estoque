const express = require('express');
const requestIp = require('request-ip');
const path = require('path');
const { cadastrarProdutos, vizualizarProdutos, atualizarEstoque, vizualizarAlertas } = require('../back/server');

const app = express();
app.use(express.json());
app.use(requestIp.mw());

// Seções
const session = require('express-session');
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'hcbgubkdfhbvncu',
    resave: false,
    saveUninitialized: false
}))
//

app.get('/', (req, res) => {

    const existe = req.session.usuario;

    if(existe) {
        res.sendFile(__dirname+"/main.html");
    } else {
        res.redirect('/login');
    }
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname+"/index.html")
})

app.post('/login', (req, res) => {
    const { usuario, senha } = req.body;

    if(usuario == "gabriel@19" && senha == "12345") {
        req.session.usuario = usuario;
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
})

app.get('/sair', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
})

app.use(express.static(__dirname));

app.get('/cadastrar', (req, res) => {
    res.sendFile(__dirname+'/cadastrar_produtos.html');
});

app.get('/entrada', (req, res) => {
    res.sendFile(__dirname+'/adicionar.html');
});

app.get('/remover', (req, res) => {
    res.sendFile(__dirname+'/remocao.html');
});

app.get('/vizualizar', (req, res) => {
    res.sendFile(__dirname+'/vizualizar.html');
});

app.get('/alerta', (req, res) => {
    res.sendFile(__dirname+'/alertas.html');
});

app.use(express.static(path.join(__dirname, '/')));

app.post('/adicionar-produtos', async (req, res) => {
    const { nome, marca, volume, uni_medida, tipo_embalagem, aplicacao, estoque, estoque_minimo } = req.body;
    
    const resposta = await cadastrarProdutos(nome, marca, volume, uni_medida, tipo_embalagem, aplicacao, estoque, estoque_minimo);
        
    if(resposta.affectedRows > 0) {
        res.json({
            msg: "Produto cadastrado"       
        })
    } else {
        res.json({
            msg: "Produto não cadastrado"       
        })
    }
})

app.put('/estoque/adicionar', async (req, res) => {
    const { nome, quantidade } = req.body;
    const ip = req.clientIp === '::1' ? '127.0.0.1' : req.clientIp;
    const agora = new Date();
    const dataHora = new Date(agora.getTime() - 3 * 60 * 60 * 1000)
        .toISOString().slice(0, 19).replace('T', ' ');
  
        const resultado = await atualizarEstoque(nome, quantidade, 'adicao', ip, dataHora);
  
        if (resultado.affectedRows > 0) {
            res.json({ msg: 'Entrada registrada com sucesso!' });
        } else {
            res.status(400).json({ msg: resultado.msg || 'Erro ao adicionar produto.' });
        }
})

app.put('/estoque/remover', async (req, res) => {
    const { nome, quantidade } = req.body;
    const ip = req.clientIp === '::1' ? '127.0.0.1' : req.clientIp;
    const agora = new Date();
    const dataHora = new Date(agora.getTime() - 3 * 60 * 60 * 1000)
        .toISOString().slice(0, 19).replace('T', ' ');
  
        const resultado = await atualizarEstoque(nome, quantidade, 'remocao', ip, dataHora);
  
        if (resultado.affectedRows > 0) {
            res.json({ msg: 'Entrada registrada com sucesso!' });
        } else {
            res.status(400).json({ msg: resultado.msg || 'Erro ao adicionar produto.' });
        }
});

app.get('/vizualizar-produtos', async (req, res) => {
    try {
        const produtos = await vizualizarProdutos();
        res.json(produtos);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ msg: 'Erro interno do servidor ao buscar produtos.' });
    }
});

app.get('/alertas', async (req, res) => {
    const alertas = await vizualizarAlertas();
    res.json(alertas);
});

app.listen(3000);