const Joi = require('joi');

module.exports = async (req, res, next) => {
    try{
        const schema = Joi.object({
            modelo: Joi.string(),
            cor: Joi.string(),
            ano: Joi.number().less(2022).greater(1950),
            acessorios: Joi.array().min(1).unique().items({descricao:Joi.string()}),
            quantidadePassageiros: Joi.number()
        });
        const { error } = await schema.validate(req.body, { abortEarly: false });
        if (error) throw error
        return next();
    } catch (error) {
        return res.status(400).json(error);
    }
} 
