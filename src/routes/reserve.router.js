const ReserveController = require('../app/controller/ReserveController');
const createValidation = require('../app/validation/rental/create');
const idValidation = require('../app/validation/idValidation');

module.exports = (server, routes, prefix = '/api/v1/rental/') => {
  routes.post('/:idRental/reserve', createValidation, ReserveController.create);
  routes.get('/:idRental/reserve', ReserveController.list);
  routes.get('/:idRental/reserve/:idReserve', idValidation, ReserveController.getById);
  routes.put('/:idRental/reserve/:idReserve', idValidation, createValidation, ReserveController.update);
  routes.patch('/:idRental/reserve/:idReserve', idValidation, ReserveController.update);
  routes.delete('/:idRental/reserve/:idReserve', idValidation, ReserveController.delete);
  server.use(prefix, routes);
};
