const Joi = require('joi');
const productsModel = require('../models/productsModel');
const { runSchema } = require('./validations');

const productService = {
  validateBodyAdd: runSchema(Joi.object({
    name: Joi.string().required(),
  })),

  validateBodyAddNameMin: runSchema(Joi.object({
    name: Joi.string().required().min(5),
  })),
  
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
  },
};

module.exports = productService;