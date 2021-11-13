const axios = require('axios').default;
const RentalSchema = require('../schema/RentalSchema');

class RentalRepository {
  async create(payload) {
    for (let item = 0; item < payload.endereco.length; item++) {
      console.log(payload.endereco[item].cep);
      const search = await axios
        .get(`https://viacep.com.br/ws/${payload.endereco[item].cep}/json`)
        .then((response) => {
          console.log(response.data);
          return response.data; 
        } )
        .catch((error) => console.log(error));
      const { logradouro, complemento, bairro, localidade, uf } = search;
      payload.endereco[item].logradouro = logradouro;
      payload.endereco[item].complemento = complemento;
      payload.endereco[item].bairro = bairro;
      payload.endereco[item].localidade = localidade;
      payload.endereco[item].uf = uf;
    }

    return RentalSchema.create(payload);
  }

  async list(payload) {
    const { page = 1, limit = 100, ...query } = payload;
    return RentalSchema.paginate(
      { ...query },
      { limit: Number(limit), page: Number(page), skip: (Number(page) - 1) * Number(limit) }
    );
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
