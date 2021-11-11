const Joi = require('joi').extend(require('@joi/date'));

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      nome: Joi.string().min(3).required(),
      cpf: Joi.string()
        .min(11)
        .max(14)
        .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
        .required(),
      data_nascimento: Joi.date().format('DD/MM/YYYY').required(),
      email: Joi.string().email().lowercase().required(),
      senha: Joi.string().min(6).required(),
      habilitado: Joi.string().valid('sim', 'não').min(3).max(3).required()
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
