const ReserveController = require('../app/controller/ReserveController');
const createValidation = require('../app/validation/reserve/create');
const validation = require('../app/validation/reserve/idValidation.js');

module.exports = (server, routes, prefix = '/api/v1/rental/') => {
  routes.post('/:idRental/reserve', validation, createValidation, ReserveController.create);
  routes.get('/:idRental/reserve', validation,  ReserveController.list);
  routes.get('/:idRental/reserve/:idReserve', validation, ReserveController.getById);
  routes.put('/:idRental/reserve/:idReserve', validation, createValidation, ReserveController.update);
  routes.patch('/:idRental/reserve/:idReserve', validation, ReserveController.update);
  routes.delete('/:idRental/reserve/:idReserve', validation, ReserveController.delete);
  server.use(prefix, routes);
};
