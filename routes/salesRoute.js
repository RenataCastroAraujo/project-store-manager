const { Router } = require('express');
const salesController = require('../controllers/salesController');

const saleRoute = Router();

saleRoute.post('/', salesController.addSale);

module.exports = saleRoute;