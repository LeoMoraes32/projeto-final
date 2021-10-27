const Joi = require('joi');

//let currentDate = new Date();
//console.log(currentDate);
//let newDate = currentDate - 18;
//console.log(newDate);

module.exports = async (req, res, next) => {
    try{
        const schema = Joi.object({
            nome: Joi.string().min(3).required(),
            cpf: Joi.string().min(11).max(14).required(),
            data_nascimento: Joi.date().required(),
            email: Joi.string().email().lowercase().required(),
            senha: Joi.string().min(6).required(),
            habilitado: Joi.string().valid('sim','não').min(3).max(3).required()
        });
        const { error } = await schema.validate(req.body, { abortEarly: true });
        if (error) throw error
        return next();
    }catch (error) {
        return res.status(400).json(error);
    }
} 