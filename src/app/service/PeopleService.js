const PeopleRepository = require('../repository/PeopleRepository');

function cpfCorrection(payload){
    let newCpf = payload.cpf.replace(".", "").replace(".", "").replace("-", "")
    payload.cpf = newCpf;
}

class PeopleService{
    async create(payload){
        cpfCorrection(payload);
        try{
            const result = await PeopleRepository.create(payload);

            return (result);
        } catch(error){
            return error;
        }
    }
    async list(){
        try{
            const result = await PeopleRepository.list();
            return result;
        } catch(error){
            return error;
        }
    }

    async listById(payload){
        try{
            const result = await PeopleRepository.listById(payload);
            return result;
        } catch(error){
            return error;
        }
    }

    async updateById(payload, body){
        try{
            const result = await PeopleRepository.updateById(payload, body);
            return result;
        } catch(error){
            return error;
        }
    }

    async deleteById(payload){
        try{
            const result = await PeopleRepository.deleteById(payload);
            return result;
        } catch(error){
            return error;
        }
    }
}

module.exports = new PeopleService();