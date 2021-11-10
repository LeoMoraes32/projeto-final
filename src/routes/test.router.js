const axios = require('axios');

module.exports = (server, routes, prefix = '/api/v1/test') => {
   
    axios.get('https://viacep.com.br/ws/NUMERO_DO_CEP/json').then((data)=>{
        console.log(data);
    });
    server.use(prefix, routes);
}