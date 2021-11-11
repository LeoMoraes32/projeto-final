const AuthenticateController = require('../app/controller/AuthenticateController');

module.exports = (server, routes, prefix = 'api/v1/authenticate') => {
  routes.post('/', AuthenticateController.generateToken);
  server.use(prefix, routes);
};
