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

  describe('#getByIdController()', function () {
    it('Deve listar um produto corretamente a partir do ID', async function () {
      // arrange
      const req = {
        params: {
          id: "1",
        },
      }
      let resSpy = sinon.spy()
      const res = {
        status: sinon.stub().returns({ json: resSpy }),
      }
      const item = { 'name': 'armadura do homem aranha' }
      const getByIdMock= sinon.stub(productsService, 'getById').resolves(item)

      // act
      await productsController.getById(req, res);

      // assert 
      expect(getByIdMock.calledOnce).to.equal(true)
      expect(resSpy.calledOnce).to.equal(true)
      expect(resSpy.calledWith(item)).to.equal(true)
    });
  });
});