const RentalController = require('../app/controller/RentalController');
const createValidation = require('../app/validation/rental/create');
// const patchValidation = require('../app/validation/car/patch');
const idValidation = require('../app/validation/idValidation');

module.exports = (server, routes, prefix = '/api/v1/rental') => {
  routes.post('/', createValidation, RentalController.create);
  routes.get('/', RentalController.list);
  routes.get('/:id', idValidation, RentalController.getById);
  routes.put('/:id', idValidation, createValidation, RentalController.update);
  routes.patch('/:id', idValidation, RentalController.update);
  routes.delete('/:id', idValidation, RentalController.delete);
  server.use(prefix, routes);
};
