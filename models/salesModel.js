const connection = require('./connection');

const salesModel = {
  async createSales() {
    const sql = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
    const [{ insertId }] = await connection.query(sql);
    return insertId;
  },

  async createSalesProducts(idSale, salesProductsItems) {
    salesProductsItems.map((product) => {
      product.idSale = idSale
      return product;
    });
    const sql = `INSERT INTO StoreManager.sales_products
      (product_id, quantity, sale_id)
      VALUES ?`;
    await connection.query(sql, [salesProductsItems
      .map(sale => [sale.productId, sale.quantity, sale.idSale])]);
    salesProductsItems.forEach(item => {
      delete item.idSale
    });
    return salesProductsItems;
  },
};

module.exports = salesModel;