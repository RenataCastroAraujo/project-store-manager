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
    const product = await productService.addProduct(data);
    res.status(201).json(product);
  },
  async editProduct(req, res) {
    const data = await productService.validateBodyAdd(req.body);
    const { id } = req.params;
    await productService.checkExists(id);
    const product = await productService.editProduct(id, data);
    res.status(200).json(product);
  },
};

module.exports = productController;