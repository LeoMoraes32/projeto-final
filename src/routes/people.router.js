const PeopleController = require('../app/controller/PeopleController');
const createValidation = require('../app/validation/people/create');
const patchValidation = require('../app/validation/people/patch');

module.exports = (server, routes, prefix = '/people') => {
    routes.post('/', createValidation, PeopleController.create);
    routes.get('/', PeopleController.list);
    routes.get('/:id', PeopleController.listById);
    routes.patch('/:id',patchValidation, PeopleController.update);
    routes.delete('/:id', PeopleController.delete);
    server.use(prefix, routes);
}

