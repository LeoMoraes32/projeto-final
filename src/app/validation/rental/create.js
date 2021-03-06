const Joi = require('joi');
const { cnpj, cep } = require('../../utils/regex');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      nome: Joi.string().min(3).trim().required(),
      cnpj: Joi.string()
        .min(14)
        .max(18)
        .regex(cnpj)
        .required(),
      atividades: Joi.string().trim().min(3).required(),
      endereco: Joi.array()
        .unique()
        .min(1)
        .items({
          cep: Joi.string()
            .regex(cep)
            .trim()
            .required(),
          complemento: Joi.string().trim(),
          number: Joi.number().required(),
          isFilial: Joi.boolean().required()
        })
        .required()
    });
    const { error } = await schema.validate(req.body, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json(
      error.details.map((detail) => ({
        description: detail.message,
        name: detail.path.join('.')
      }))
    );
  }
};
