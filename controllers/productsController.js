const productService = require('../services/productsService');

const productController = {
  async list(_req, res) {
    const products = await productService.list();
    if (!products) res.status(404).json({ message: 'Product Not Found' });
    res.status(200).json(products);
  },
  async getById(req, res) {
    const { id } = req.params;
    const product = await productService.getById(id);
    if (!product || product.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  },
  async addProduct(req, res) {
    const data = await productService.validateBodyAdd(req.body);
    if (!data) {
      return res.status(400).json({ message: '"name" is required' });
    }
    if (!await productService.validateBodyAddNameMin(req.body)) {
      return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
    }
    const { name } = data;
    const product = await productService.addProduct(name);
    res.status(201).json(product);
  },
};

module.exports = productController;