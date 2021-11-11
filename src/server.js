const swaggerUi = require('swagger-ui-express');
const app = require('./app');
const swaggerDocs = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.listen(process.env.PORT || 3000);
