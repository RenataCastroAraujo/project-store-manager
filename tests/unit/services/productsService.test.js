const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

describe('productsService', function () {
  beforeEach(function () {
    sinon.restore();
  });

  describe('#list()', function () {
    it('Deve listar os produtos corretamente', async function () {
      // arrange
      const modelReturn = [{ 'name': 'armadura do homem aranha' }]
      sinon.stub(productsModel, 'list').returns(modelReturn);

      // act
      const result = await productsService.list();

      // assert 
      const resultExpected = [{ 'name': 'armadura do homem aranha' }];
      expect(result).to.deep.equal(resultExpected);
    });
  });
});
