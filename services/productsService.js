const productsModel = require('../models/productsModel');

const productService = {
  async list() {
    const products = await productsModel.list();
    return products;
  },
  async getById(id) {
    const product = await productsModel.getById(id);
    return product;
  },
  async addProduct(item) {
    const product = await productsModel.addProduct(item);
    return product;

  }
};

module.exports = productService;