const FleetController = require('../app/controller/FleetController');
const createValidation = require('../app/validation/fleet/create');

module.exports = (server, routes, prefix = '/api/v1/rental') => {
  routes.post('/:idRental/fleet', createValidation, FleetController.create);
  routes.get('/:idRental/fleet', FleetController.list);
  routes.get('/:idRental/fleet/:idFleet', FleetController.getById);
  routes.put('/:idRental/fleet/:idFleet', createValidation, FleetController.update);
  routes.patch('/:idRental/fleet/:idFleet', FleetController.update);
  routes.delete('/:idRental/fleet/:idFleet', FleetController.delete);
  server.use(prefix, routes);
};
