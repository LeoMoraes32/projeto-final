const CarController = require('../app/controller/CarController');
const createValidation = require('../app/validation/car/create');
const patchValidation = require('../app/validation/car/patch');
const idValidation = require('../app/validation/car/idValidation');
const bearerAuthentication = require('../app/middleware/bearerAuthentication');

module.exports = (server, routes, prefix = '/api/v1/car') => {
  routes.post('/', bearerAuthentication, createValidation, CarController.create);
  routes.get('/', bearerAuthentication, patchValidation, CarController.list);
  routes.get('/:id', bearerAuthentication, idValidation, CarController.getById);
  routes.put('/:id', bearerAuthentication, idValidation, createValidation, CarController.update);
  routes.patch('/:id', bearerAuthentication, idValidation, patchValidation, CarController.update);
  routes.patch('/:id/acessorios/:idAcessory', bearerAuthentication, CarController.patchAcessory);
  routes.delete('/:id', bearerAuthentication, idValidation, CarController.delete);
  server.use(prefix, routes);
};
