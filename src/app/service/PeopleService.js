const PeopleRepository = require('../repository/PeopleRepository');

class PeopleService{
    async create(payload){
        try{
            const result = await PeopleRepository.create(payload);

            console.log(payload.data_nascimento);
            const now = new Date();
            const birth = new Date(await schema.validate(req.body).value.data_nascimento);
            console.log(birth);
            
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