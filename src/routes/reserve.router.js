const ReserveController = require('../app/controller/ReserveController');
const createValidation = require('../app/validation/reserve/create');
const idValidation = require('../app/validation/idValidation');

module.exports = (server, routes, prefix = '/api/v1/rental/') => {
  routes.post('/:idRental/reserve', createValidation, ReserveController.create);
  routes.get('/:idRental/reserve', ReserveController.list);
  routes.get('/:idRental/reserve/:idReserve', ReserveController.getById);
  routes.put('/:idRental/reserve/:idReserve', createValidation, ReserveController.update);
  routes.patch('/:idRental/reserve/:idReserve', ReserveController.update);
  routes.delete('/:idRental/reserve/:idReserve', ReserveController.delete);
  server.use(prefix, routes);
};
