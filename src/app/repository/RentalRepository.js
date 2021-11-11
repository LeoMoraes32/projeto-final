const axios = require('axios').default;
const RentalSchema = require('../schema/RentalSchema');

class RentalRepository {
  async create(payload) {
    let item;
    for (item = 0; item < payload.endereco.length; item++) {
      const busca = axios
        .get(`https://viacep.com.br/ws/${payload.endereco[item].cep}/json`)
        .then((response) => response.data);
      const { logradouro, complemento, bairro, localidade, uf } = busca;
      payload.endereco[item].logradouro = logradouro;
      payload.endereco[item].complemento = complemento;
      payload.endereco[item].bairro = bairro;
      payload.endereco[item].localidade = localidade;
      payload.endereco[item].uf = uf;
    }

    return RentalSchema.create(payload);
  }

  async list(payload) {
    return RentalSchema.paginate(payload, {
      page: payload.page || 1,
      limit: 100
    });
  }

  async getById(payload) {
    return RentalSchema.findById(payload);
  }

  async updateById(payload, body) {
    return RentalSchema.findByIdAndUpdate(payload, body, {
      new: true,
      runValidators: true
    });
  }

  async deleteById(payload) {
    return RentalSchema.findByIdAndDelete(payload);
  }
}
module.exports = new RentalRepository();
