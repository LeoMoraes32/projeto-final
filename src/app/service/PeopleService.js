const PeopleRepository = require('../repository/PeopleRepository');
const moment = require('moment');

class PeopleService{
    async create(payload){
        //const dateRight = moment(payload.data_nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD');
        //const age = moment().diff(dateRight, 'years');
        payload.data_nascimento = moment(payload.data_nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD');
        const age = moment().diff(payload.data_nascimento, 'years');
        if(age < 18){
            throw Error('Age under 18');
        }
        
        const result = await PeopleRepository.create(payload);
        return result;
    }
    async list(payload){
        try{
            const result = await PeopleRepository.list(payload);
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
            if(!result) throw Error("Not found");
            return result;
        } catch(error){
            return error;
        }
    }
}

module.exports = new PeopleService();