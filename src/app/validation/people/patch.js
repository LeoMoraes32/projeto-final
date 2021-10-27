const Joi = require('joi');

module.exports = async (req, res, next) => {
    try{
        const schema = Joi.object({
            nome: Joi.string().min(3),
            cpf: Joi.string().min(11).max(14),
            data_nascimento: Joi.date(),
            email: Joi.string().email().lowercase().unique(),
            senha: Joi.string().min(6),
            habilitado: Joi.string().valid('sim','não').min(3).max(3)
        });
        const { error } = await schema.validate(req.body, { abortEarly: false });
        if (error) throw error
        return next();
    }catch (error) {
        return res.status(400).json(error);
    }
} 
