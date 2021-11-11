const PeopleController = require('../app/controller/PeopleController');
const createValidation = require('../app/validation/people/create');
const patchValidation = require('../app/validation/people/patch');
const idValidation = require('../app/validation/people/idValidation');

module.exports = (server, routes, prefix = '/api/v1/people') => {
  routes.post('/', createValidation, PeopleController.create);
  routes.get('/', PeopleController.list);
  routes.get('/:id', idValidation, PeopleController.getById);
  routes.put('/:id', idValidation, createValidation, PeopleController.update);
  routes.patch('/:id', idValidation, patchValidation, PeopleController.update);
  routes.delete('/:id', idValidation, PeopleController.delete);
  server.use(prefix, routes);
};
