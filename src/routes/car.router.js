const CarController = require('../app/controller/CarController');
const createValidation = require('../app/validation/car/create');

module.exports = (server, routes, prefix = '/car') => {
    routes.post('/', createValidation, CarController.create);
    routes.get('/', CarController.list);
    routes.get('/:id', CarController.listById);
    routes.patch('/:id', CarController.update);
    routes.delete('/:id', CarController.delete);
    server.use(prefix, routes);
}