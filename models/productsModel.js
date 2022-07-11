const connection = require('./connection');

const productsModel = {
  async list() {
    const sql = `SELECT * FROM StoreManager.products`;
    const [items] = await connection.query(sql);
    return items
  },
  async getById(id) {
    const sql = `SELECT * FROM StoreManager.products WHERE id=?`;
    const [[product]] = await connection.query(sql, [id]);
    return product;
  }
};

module.exports = productsModel;