const Joi = require('joi');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      nome: Joi.string().min(3).replace(' ', '').required(),
      cnpj: Joi.string()
        .min(14)
        .max(18)
        .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)
        .required(),
      atividades: Joi.string().trim().min(3).required(),
      endereco: Joi.array()
        .unique()
        .min(1)
        .items({
          cep: Joi.string()
            .regex(/^\d{5}-\d{3}$/)
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
    const erros = [];
    const { details } = error;
    details.forEach((t) => {
      erros.push({
        description: t.path[0],
        name: t.message
      });
    });
    return res.status(400).json(erros);
  }
};
