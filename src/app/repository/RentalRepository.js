const axios = require('axios').default;
const RentalSchema = require('../schema/RentalSchema');
const Repository = require('./Repository'); 

class RentalRepository extends Repository{
  constructor(){
    super(RentalSchema);
  }

  async create(payload) {
    for (let item = 0; item < payload.endereco.length; item++) {
      const search = await axios.get(`https://viacep.com.br/ws/${payload.endereco[item].cep}/json`);
      const { logradouro, complemento, bairro, localidade, uf } = search.data;
      payload.endereco[item].logradouro = logradouro;
      payload.endereco[item].complemento = complemento;
      payload.endereco[item].bairro = bairro;
      payload.endereco[item].localidade = localidade;
      payload.endereco[item].uf = uf;
    }

    return RentalSchema.create(payload);
  }



  async deleteById(payload) {
    return RentalSchema.findByIdAndDelete(payload);
  }
}
module.exports = new RentalRepository();
