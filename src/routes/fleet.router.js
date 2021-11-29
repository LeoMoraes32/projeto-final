const FleetController = require('../app/controller/FleetController');
const createValidation = require('../app/validation/fleet/create');
const validation = require('../app/validation/reserve/idValidation.js');

module.exports = (server, routes, prefix = '/api/v1/rental') => {
  routes.post('/:idRental/fleet', validation, createValidation, FleetController.create);
  routes.get('/:idRental/fleet', validation, FleetController.list);
  routes.get('/:idRental/fleet/:idFleet', validation, FleetController.getById);
  routes.put('/:idRental/fleet/:idFleet', validation, createValidation, FleetController.update);
  routes.patch('/:idRental/fleet/:idFleet', validation, FleetController.update);
  routes.delete('/:idRental/fleet/:idFleet', validation, FleetController.delete);
  server.use(prefix, routes);
};
