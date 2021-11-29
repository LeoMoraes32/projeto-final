const Joi = require('joi');
const { id } = require('../../utils/regex');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id_carro: Joi.string().required().regex(id).min(24).max(24),
      id_locadora: Joi.string().required().regex(id).min(24).max(24),
      status: Joi.string().required(),
      placa: Joi.string().required().min(6),
      valor_diaria: Joi.number().required()
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