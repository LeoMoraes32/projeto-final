const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authConfig = require('../config/auth.json');
const PeopleRepository = require('../repository/PeopleRepository');

class AuthService {
  async authenticate(email, senha) {
    const people = await PeopleRepository.findPeopleByEmail(email);
    const { habilitado } = people;

    if (!people) throw Error('people not found.');

    bcrypt.compare(senha, people.senha, (error) => {
      if (error) throw Error('Invalid password.');
    });

    people.senha = undefined;

    const token = jwt.sign({ id: people.id }, authConfig.secret, {
      expiresIn: 86400
    });

    return { email, habilitado, token };
  }
}

module.exports = new AuthService();
