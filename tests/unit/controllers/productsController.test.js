const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController'); 
 
 
describe('productsController', function () {
  beforeEach(function () {
    sinon.restore();
  });

  describe('#listController()', function () {
    it('Deve listar os produtos corretamente', async function () {
      // arrange
      const req = {} 
      let resSpy = sinon.spy()
      const res = {
        status: sinon.stub().returns({json: resSpy }),
      }
      const items = [{ 'name': 'armadura do homem aranha' }]
      const list = sinon.stub(productsService, 'list').resolves(items)

      // act
      await productsController.list(req, res);

      // assert 
      expect(list.calledOnce).to.equal(true)
      expect(resSpy.calledOnce).to.equal(true)
      expect(resSpy.calledWith(items)).to.equal(true)

      
    });
  });
});