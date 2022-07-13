const connection = require('./connection');

const salesModel = {
  async createSales() {
    const sql = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
    const [{ insertId }] = await connection.query(sql);
    return insertId;
  },
  async createSalesProducts(idSale, salesProductsItems) {
    const sales = salesProductsItems.map((product) => {
      const newProduct = {
        productId: product.productId,
        quantity: product.quantity,
      };
      return newProduct;
    });
    const sql = `INSERT INTO StoreManager.sales_products
      (product_id, quantity, sale_id)
      VALUES ?`;
    await connection.query(sql, [sales
      .map((sale) => [sale.productId, sale.quantity, idSale])]);
    return sales;
  },

  async list() {
    const sql = `SELECT s.id, s.date, sp.product_id, quantity
       FROM StoreManager.sales s inner join StoreManager.sales_products sp
       on s.id = sp.sale_id`;
    const [items] = await connection.query(sql);
    const result = items.map((sale) => {
      const newSale = {
        saleId: sale.id,
        date: sale.date,
        productId: sale.product_id,
        quantity: sale.quantity,
      };
      return newSale;
    });
    return result;
  },

  async getSaleProductsById(id) {
    const sql = `SELECT s.date, sp.product_id, quantity
       FROM StoreManager.sales s inner join StoreManager.sales_products sp
       on s.id = sp.sale_id where id=?`;
    const [items] = await connection.query(sql, [id]);
    const result = items.map((sale) => {
      const newSale = {
        date: sale.date,
        productId: sale.product_id,
        quantity: sale.quantity,
      };
      return newSale;
    });
    return result;
  },

  async getById(id) {
    const sql = 'SELECT * FROM StoreManager.sales WHERE id=?';
    const [[items]] = await connection.query(sql, [id]);
    return items;
  },
};

module.exports = salesModel;