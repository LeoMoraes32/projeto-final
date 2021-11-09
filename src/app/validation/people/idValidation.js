const Joi = require('joi');
const PeopleRepository = require('../../repository/PeopleRepository');

module.exports = async(req, res, next) =>{
    try{
        const schema = Joi.object({
            id: Joi.string().min(24).max(24).pattern(/^[0-9a-fA-F]{24}$/).required()
        });

        const { error } = await schema.validate(req.params, { abortEarly: false });
        if(error) throw error

        const { id } = req.params;
        
        const people = await PeopleRepository.listById(id);

        if(people){
            req.people = people;
            next();
        } else {
            res.status(404).json({ message: 'People ID not exist'});
        }

    } catch(error) {
        return res.status(400).json({ description: error.path, name: error.message });;
    }
}