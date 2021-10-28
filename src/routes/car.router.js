const CarController = require('../app/controller/CarController');
const createValidation = require('../app/validation/car/create');
const patchValidation = require('../app/validation/car/patch');
const idValidation = require('../app/validation/idValidation');


module.exports = (server, routes, prefix = '/car') => {
    routes.post('/', createValidation, CarController.create);
    routes.get('/', CarController.list);
    routes.get('/:id',idValidation, CarController.listById);
    routes.put('/:id', CarController.update);
    routes.patch('/:id',patchValidation, CarController.update);
    routes.delete('/:id',idValidation, CarController.delete);
    server.use(prefix, routes);
}