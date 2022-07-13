const Joi = require('joi');
const productsModel = require('../models/productsModel');
const { runSchema } = require('./validations');
const NotFoundError = require('../errors/productNotFoundError');

const productService = {
  validateBodyAdd: runSchema(Joi.object({
    name: Joi.string().required().min(5).messages({
      'any.required': '"name" is required',
      'string.min': '"name" length must be at least 5 characters long',
    }),
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
  async checkIfExistsByArrayOfId(arrayOfId) {
    const items = await productsModel.listByArrayOfId(arrayOfId);

    if (!items.length) throw new NotFoundError('Product not found');

    const objectKeys = items.map((item) => Object.values(item)[0]);

    arrayOfId.forEach((productId) => {
      if (!objectKeys.includes(productId)) {
        throw new NotFoundError('Product not found');
      }
    });
  },
  async editProduct(id, changes) {
    await productsModel.editProduct(id, changes);
    return { id, ...changes };
  },
  async checkExists(id) {
    const exists = await productsModel.existsId(id);
    if (!exists) throw new NotFoundError('Product not found');
  },
};

module.exports = productService;