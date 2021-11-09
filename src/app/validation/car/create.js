const Joi = require('joi');

module.exports = async (req, res, next) => {
    try{
        const schema = Joi.object({
            modelo: Joi.string().min(3).replace(' ', '').required(),
            cor: Joi.string().min(3).replace(' ', '').required(),
            ano: Joi.number().min(1950).max(2022).required(),
            acessorios: Joi.array().min(1).unique().items({descricao:Joi.string().min(3).replace(' ', '').required()}).required(),
            quantidadePassageiros: Joi.number().required(),
        });
        const { error } = await schema.validate(req.body, { abortEarly: false });
        if (error) throw error
        return next();a
    } catch (error) {
        return res.status(400).json({ description: error.path, name: error.message });
    }
} 
