const connection = require('./connection');

const productsModel = {
  async list() {
    const sql = 'SELECT * FROM StoreManager.products';
    const [items] = await connection.query(sql);
    return items;
  },
  async getById(id) {
    const sql = 'SELECT * FROM StoreManager.products WHERE id=?';
    const [[product]] = await connection.query(sql, [id]);
    return product;
  },
  async addProduct(item) {
    const sql = 'INSERT INTO StoreManager.products (name) VALUES (?)';
    const [insertedItem] = await connection.query(sql, [item]);
    const result = { id: insertedItem.insertId, name: item.name };
    return result;
  },
  async existsId(id) {
    const sql = `
      SELECT 1
      FROM StoreManager.products
      WHERE id = ?
    `;
    const [[item]] = await connection.query(sql, [id]);
    return !!item;
  },
  async listByArrayOfId(arrayOfId) {
    const sql = 'SELECT * FROM StoreManager.products WHERE id IN (?)';
    const [items] = await connection.query(sql, [arrayOfId]);
    return items;
  },
  async editProduct(id, changes) {
    const sql = 'UPDATE products SET ? WHERE id=?';
    await connection.query(sql, [changes, id]);
  },
};

module.exports = productsModel;