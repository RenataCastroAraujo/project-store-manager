const express = require('express');
require('express-async-errors');
const productRoute = require('./routes/productsRoute');
const saleRoute = require('./routes/salesRoute');

const app = express();
app.use(express.json());

app.use('/products', productRoute);
app.use('/sales', saleRoute);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use((err, _req, res, _next) => {
  const { name, message } = err;
  switch (name) {
    case 'UnprocessedEntityError': res.status(422).json({ message }); break;
    case 'ProductNameNotExists': res.status(400).json({ message }); break;
    case 'ProductLenghtError': res.status(422).json({ message }); break;
    case 'ProductNotFoundError': res.status(404).json({ message }); break;
    case 'ValidationError': res.status(400).json({ message }); break;
    case 'NotFoundError': res.status(404).json({ message }); break;
    default: console.warn(err); res.sendStatus(500);
  }
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;