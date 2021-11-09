const CarController = require('../app/controller/CarController');
const createValidation = require('../app/validation/car/create');
const patchValidation = require('../app/validation/car/patch');
const idValidation = require('../app/validation/car/idValidation');

module.exports = (server, routes, prefix = '/api/v1/car') => {
    routes.post('/', createValidation, CarController.create);
    routes.get('/',patchValidation, CarController.list);
    routes.get('/:id',idValidation, CarController.listById);
    routes.put('/:id',idValidation, createValidation, CarController.update);
    routes.patch('/:id',idValidation, patchValidation, CarController.update);
    routes.patch('/:id/acessorios/:id', CarController.patch);
    routes.delete('/:id',idValidation, CarController.delete);
    server.use(prefix, routes);
}