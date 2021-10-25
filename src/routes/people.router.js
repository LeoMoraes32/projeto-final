const PeopleController = require('../app/controller/PeopleController');
const createValidation = require('../app/validation/people/create');

module.exports = (server, routes, prefix = '/people') => {
    routes.post('/', createValidation, PeopleController.create);
    routes.get('/', PeopleController.list);
    routes.get('/:id', PeopleController.listById);
    routes.patch('/:id', PeopleController.update);
    routes.delete('/:id', PeopleController.delete);
    server.use(prefix, routes);
}

