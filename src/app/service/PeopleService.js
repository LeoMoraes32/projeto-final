const moment = require('moment');
const PeopleRepository = require('../repository/PeopleRepository');
const AgeUnderEighteen = require('../errors/peopleError/AgeUnderEighteen');
const UniqueCpf = require('../errors/peopleError/UniqueCpf');
const UniqueEmail = require('../errors/peopleError/UniqueEmail');
const IdNotFound = require('../errors/peopleError/IdNotFound');
const ValidCpf = require('../utils/ValidCpf');

class PeopleService {
  async create(payload) {
    await ValidCpf.verifyCpf(payload.cpf);
    payload.data_nascimento = moment(payload.data_nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const age = moment().diff(payload.data_nascimento, 'years');
    if (age < 18) {
      throw new AgeUnderEighteen(payload.nome, age);
    }

    const cpf = await PeopleRepository.list({ cpf: payload.cpf });
    if (cpf.docs.length) {
      throw new UniqueCpf(cpf.docs[0].cpf);
    }

    const email = await PeopleRepository.list({ email: payload.email });
    if (email.docs.length) {
      throw new UniqueEmail(email.docs[0].email);
    }
    const result = await PeopleRepository.create(payload);
    return result;
  }

  async list(payload) {
    const result = await PeopleRepository.list(payload);
    if (!result) throw new Error();
    return result;
  }

  async getById(payload) {
    const result = await PeopleRepository.getById(payload);
    if (!result) throw new IdNotFound(payload);
    return result;
  }

  async updateById(payload, body) {
    if (body.cpf) await ValidCpf.verifyCpf(body.cpf);
    const result = await PeopleRepository.updateById(payload, body);
    if (!result) throw new IdNotFound(payload);
    return result;
  }

  async deleteById(payload) {
    const result = await PeopleRepository.deleteById(payload);
    if (!result) throw new IdNotFound(payload);
    return result;
  }
}

module.exports = new PeopleService();
