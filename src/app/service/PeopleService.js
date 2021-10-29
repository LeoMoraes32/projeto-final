const PeopleRepository = require('../repository/PeopleRepository');
const moment = require('moment');

function cpfCorrection(payload){
    let newCpf = payload.cpf.replace(".", "").replace(".", "").replace("-", "")
    payload.cpf = newCpf;
}

class PeopleService{
    async create(payload){
        cpfCorrection(payload);
        try{
            const enterData = moment(payload.data_nascimento, 'DD/MM/YYYY').format('YYYY/MM/DD');
            const data = (moment().diff(payload.data_nascimento, 'years'));

            if(data < 18){
                throw (error, false);
            } 

            const result = {enterData, ...payload};
            const results = await PeopleRepository.create(result);
            
            return (results);
        } catch(error){
            if(false){
                return false
            }
            return error;
        }
    }
    async list(perPage, page){
        try{
            const result = await PeopleRepository.list(perPage, page);
            return result;
        } catch(error){
            return error;
        }
    }
    async listByParams(payload){
        try{
            const result = await PeopleRepository.listByParams(payload);
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