const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const PeopleSchema = require('../schema/PeopleSchema');
const auth = require('../config/auth.json');

class AuthenticateController {
  async generateToken(req, res) {
    const { email, senha } = req.body;
    console.log('chegou aqui');
    const people = await PeopleSchema.findOne(email);
    if (!people) return res.status(400).json('email not found');
    const encrypt = crypto.createHash('md5').update(senha).digest('hex');
    if (encrypt !== people.senha) return res.status(400).json('password not match');
    people.senha = undefined;
    const { habilitado } = people;
    const token = jwt.sign({ id: people._id }, auth.secret, { expiresIn: 86400 });
    req.body.token = token;
    req.headers.authorization = `Bearer ${token}`;
    return res.status(201).json({ email, habilitado, token });
  }
}
module.exports = new AuthenticateController();
