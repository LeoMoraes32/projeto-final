const Joi = require('joi');
const { id } = require('../../utils/regex');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id_user: Joi.string().required().regex(id).min(24).max(24),
      data_inicio: Joi.string().required(),
      data_fim: Joi.string().required(),
      id_carro: Joi.string().required().regex(id),
      id_locadora: Joi.string().required().regex(id),
      valor_final: Joi.number().required()
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