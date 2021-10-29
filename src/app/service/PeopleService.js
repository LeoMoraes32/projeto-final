const PeopleRepository = require('../repository/PeopleRepository');
const moment = require('moment');

class PeopleService{
    async create(payload){
        try{
            payload.data_nascimento = moment(payload.data_nascimento, 'DD/MM/YYYY').format('MM/DD/YYYY');
            const age = moment().diff(payload.data_nascimento, 'years');
            if(age < 18){
                throw error;
            } 

            const result = await PeopleRepository.create(payload);
            return result;
        } catch(error){
            return error;
        }
    }
    async list({offset, limit, ...payload}){
        try{
            const result = await PeopleRepository.list(payload, offset, limit);
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