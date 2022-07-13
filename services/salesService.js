const Joi = require('joi');
const salesModel = require('../models/salesModel');
const { runSchema } = require('./validations');

const salesService = {
  validateBody: runSchema(Joi.array().required().items(
    Joi.object({
      productId: Joi.number().required().positive().messages({
        'any.required': '"productId" is required',
      }),
      quantity: Joi.number().required().min(1).messages({
        'any.required': '"quantity" is required',
        'number.min': '"quantity" must be greater than or equal to 1',
      }),
    }),
  )),

  async list() {
    const sales = await salesModel.list();
    return sales;
  },
  async getById(id) {
    const sale = await salesModel.getSaleProductsById(id);
    return sale;
  },

  async addSalesWithProducts(products) { 
    const saleInsertedId = await salesModel.createSales();
    const saleInsertedWithProducts = await salesModel.createSalesProducts(saleInsertedId, products);
    return { id: saleInsertedId, itemsSold: saleInsertedWithProducts };
  },
};

module.exports = salesService;
