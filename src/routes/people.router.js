

module.exports = (server, routes, prefix = '/people') => {
    routes.get('/', PeopleController.getAll());
    server.use(prefix, routes);
}