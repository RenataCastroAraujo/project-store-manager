const {expect} = require('chai'); 
const sinon = require('sinon');
const productsModel = require('../../../models/productsModel');
const connection = require('../../../models/connection');

describe('productsModel', function () {
  beforeEach(function () {
    sinon.restore();
  });

  describe('#list()', function () {
    it('Deve listar os produtos quando existem dados na tabela', async function () {
      // arrange
      const queryReturn = [[{ 'name': 'armadura do homem aranha' }]]
      sinon.stub(connection, 'query').returns(queryReturn);

      // act
      const result = await productsModel.list(); 

      // assert 
      const resultExpected = [{ 'name': 'armadura do homem aranha' }]; 
      expect(result).to.deep.equal(resultExpected);
    });
  });

  describe('#getById()', function () {
    it('Deve listar um produto corretamente', async function () {
      // arrange
      const queryReturn = [
        [
          {
            id: 1,
            name: "Martelo de Thor",
          },
        ],
        [],
      ]
      sinon.stub(connection, 'query').returns(queryReturn);

      // act
      const result = await productsModel.getById(1);

      // assert 
      const resultExpected = { 'id' : 1, 'name': 'Martelo de Thor' };
      expect(result).to.deep.equal(resultExpected);
    });
  });

  describe('#addProduct()', function () {
    it('Deve adicionar produto corretamente', async function () {
      // arrange
      const queryReturn = [
        {
          fieldCount: 0,
          affectedRows: 1,
          insertId: 1,
          info: "",
          serverStatus: 2,
          warningStatus: 0,
        },
        undefined,
      ]
      sinon.stub(connection, 'query').returns(queryReturn);

      // act
      const result = await productsModel.addProduct({
        "name": "Martelo de Thor"
      });

      // assert 
      const resultExpected = { 'id': 1, 'name': 'Martelo de Thor' };
      expect(result).to.deep.equal(resultExpected);
    });
  });
});
