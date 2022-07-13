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

const typeErrors = {
  UnprocessedEntityError: 422,
  ProductNameNotExists: 400,
  ProductLenghtError: 422,
  ProductNotFoundError: 404,
  ValidationError: 400,
  NotFoundError: 404,
};

const filterErrors = (err, _req, res, _next) => {
  const { name, message } = err;
  if (typeErrors[name]) {
    res.status(typeErrors[name]).json({ message });
  } else {
    console.warn(err); res.sendStatus(500);
  }
};

app.use(filterErrors);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;