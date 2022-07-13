const saleService = require('../services/salesService');
const productsService = require('../services/productsService');

const saleController = {
  async addSale(req, res) {
    const data = await saleService.validateBody(req.body);
    const productIds = data.map(product => product.productId);
    await productsService.checkIfExistsByArrayOfId(productIds);
    const sale = await saleService.addSalesWithProducts(data);
    return res.status(201).json(sale);
  },
};

module.exports = saleController;