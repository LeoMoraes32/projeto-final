const axios = require('axios').default;
const RentalSchema = require('../schema/RentalSchema');

class RentalRepository {
    async create(payload){
        let item;
        for (item = 0; item < payload.endereco.length; item++){
            const busca = await axios.get(`https://viacep.com.br/ws/${payload.endereco[item].cep}/json`).then((response) => response.data);
            const { logradouro, complemento, bairro, localidade, uf} = busca;
            payload.endereco[item].logradouro = logradouro;
            payload.endereco[item].complemento = complemento;
            payload.endereco[item].bairro = bairro;
            payload.endereco[item].localidade = localidade;
            payload.endereco[item].uf = uf;
        }

        return await RentalSchema.create(payload);
    }

    async list(payload){
        return await RentalSchema.paginate(payload, {
            page: payload.page || 1,
            limit: 100
        })
    }

    async listById(payload){
        return await RentalSchema.findById(payload);
    }

    async updateById(payload, body){
        return await RentalSchema.findByIdAndUpdate(payload, body, {
            new: true,
            runValidators: true
        });
    }

    async deleteById(payload){
        return await RentalSchema.findByIdAndDelete(payload);
    }
}
module.exports = new RentalRepository();