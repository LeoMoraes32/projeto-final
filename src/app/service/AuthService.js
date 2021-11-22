const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authConfig = require('../config/auth.json');
const PeopleRepository = require('../repository/PeopleRepository');

class AuthService {
  async authenticate(email, senha) {
    const people = await PeopleRepository.findPeopleByEmail(email);

    if (!people) throw new Error('people not found.');

    const { habilitado } = people;

    if (!(await bcrypt.compare(senha, people.senha))) {
      throw new Error('Invalid password');
    }

    people.senha = undefined;

    const token = jwt.sign({ id: people.id }, authConfig.secret, {
      expiresIn: 86400
    });

    return { email, habilitado, token };
  }
}

module.exports = new AuthService();
