const PeopleSchema = require('../app/schema/PeopleSchema');

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const authConfig = require('../app/config/auth');

function generatedToken(params = {} ){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

module.exports = (server, routes, prefix = '/api/v1/authenticate') => {
    routes.post('/', async (req, res) => {
        //console.log(req.body);

        const { email, senha } = req.body;
        const encrypt = crypto.createHash('md5').update(senha).digest('hex');
        //console.log(encrypt);
        const people = await PeopleSchema.findOne({ email, encrypt });
        
        //console.log('passou');
        
        if(!people){
            return res.status(400).json('People not found!');
        }

        if(encrypt != people.senha){
            return res.status(400).json('Invalid password');
        }

        res.send({ 
            people, 
            token: generatedToken({ id: people.id }),
        });

    });
    server.use(prefix, routes);
}
