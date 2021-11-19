const cors = require('cors');
const app = require('./app');

app.use(cors());
app.listen(process.env.PORT || 3000);
