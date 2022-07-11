const { Router } = require('express');
const productController = require('../controllers/productsController');

const productRoute = Router();

productRoute.get('/', productController.list);
productRoute.get('/:id', productController.getById);

module.exports = productRoute;
