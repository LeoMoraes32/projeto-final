const RentalController = require('../app/controller/RentalController');
const createValidation = require('../app/validation/rental/create');
const patchValidation = require('../app/validation/car/patch');
const idValidation = require('../app/validation/car/idValidation');

module.exports = (server, routes, prefix = '/api/v1/rental') => {
    routes.post('/',createValidation, RentalController.create);
    routes.get('/', RentalController.list);
    routes.get('/:id', RentalController.listById);
    routes.put('/:id', createValidation, RentalController.update);
    routes.patch('/:id', RentalController.update);
    routes.delete('/:id', RentalController.delete);
    server.use(prefix, routes);
}