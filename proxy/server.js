const express = require('express');
const https = require('https');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurar o cabeçalho para permitir que o site em 'http://127.0.0.1:8080' acesse o recurso
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/consultar-pni-sus', (req, res) => {
  const cpf = req.query.cpf;
  const api_url = `https://statictools.com.br/Consultas-9933344FF422G24DDG4985882-PNI.php?cpf=${cpf}`;

  consultarAPI(api_url, res);
});

app.get('/consultar-telefone', (req, res) => {
  const telefone = req.query.telefone;
  const api_url = `https://statictools.com.br/Consultas-9933344FF422G24DDG4985882-Telefone.php?telefone=${telefone}`;

  consultarAPI(api_url, res);
});

app.get('/consultar-nome', (req, res) => {
  const nome = req.query.nome;
  const api_url = `https://statictools.com.br/Consultas-9933344FF422G24DDG4985882-nome.php?nome=${nome}`;

  consultarAPI(api_url, res);
});

app.get('/consultar-cep', (req, res) => {
  const cep = req.query.cep;
  const api_url = `https://statictools.com.br/Consultas-9933344FF422G24DDG4985882-cep.php?cep=${cep}`;

  consultarAPI(api_url, res);
});

app.get('/consultar-cpf-completa', (req, res) => {
  const cpf = req.query.cpf;
  const api_url = `https://statictools.com.br/Consultas-9933344FF422G24DDG4985882-cpf.php?cpf=${cpf}`;

  consultarAPI(api_url, res);
});

app.get('/consultar-cnpj-completa', (req, res) => {
  const cnpj = req.query.cnpj;
  const api_url = `https://statictools.com.br/Consultas-9933344FF422G24DDG4985882-cnpj.php?cnpj=${cnpj}`;

  consultarAPI(api_url, res);
});

app.get('/consultar-placa-completa', (req, res) => {
  const placa = req.query.placa;
  const api_url = `https://statictools.com.br/Consultas-9933344FF422G24DDG4985882-placa.php?placa=${placa}`;

  consultarAPI(api_url, res);
});

function consultarAPI(api_url, res) {
  https.get(api_url, (api_res) => {
    let data = '';

    api_res.on('data', (chunk) => {
      data += chunk;
    });

    api_res.on('end', () => {
      // Define o cabeçalho de resposta como JSON (ou XML, dependendo da resposta da API)
      res.header('Content-Type', 'application/json');
      res.send(data);
    });
  }).on('error', (error) => {
    console.error('Erro ao consultar API:', error);
    res.status(500).send('Erro ao consultar a API. Verifique o console para mais informações.');
  });
}

app.listen(port, () => {
  console.log(`Servidor proxy rodando em http://localhost:${port}`);
});
