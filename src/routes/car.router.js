const CarController = require('../app/controller/CarController');
const createValidation = require('../app/validation/car/create');
const patchValidation = require('../app/validation/car/patch');

module.exports = (server, routes, prefix = '/car') => {
    routes.post('/', createValidation, CarController.create);
    routes.get('/', CarController.list);
    routes.get('/:id', CarController.listById);
    routes.patch('/:id',patchValidation, CarController.update);
    routes.delete('/:id', CarController.delete);
    server.use(prefix, routes);
}