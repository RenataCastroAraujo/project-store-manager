const saleService = require('../services/salesService');
const productsService = require('../services/productsService');

const saleController = {
  async addSale(req, res) {
    const data = await saleService.validateBody(req.body);
    const productIds = data.map((product) => product.productId);
    await productsService.checkIfExistsByArrayOfId(productIds);
    const sale = await saleService.addSalesWithProducts(data);
    return res.status(201).json(sale);
  },
  async list(_req, res) {
    const sales = await saleService.list();
    if (!sales) res.status(404).json({ message: 'Sale Not Found' });
    res.status(200).json(sales);
  },
  async getById(req, res) {
    const { id } = req.params;
    const sale = await saleService.getById(id);
    if (!sale || sale.length === 0) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.status(200).json(sale);
  },
};

module.exports = saleController;