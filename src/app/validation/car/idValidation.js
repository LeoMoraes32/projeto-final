const Joi = require('joi');
const CarRepository = require('../../repository/CarRepository');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id: Joi.string()
        .min(24)
        .max(24)
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
    });

    const { error } = await schema.validate(req.params, { abortEarly: false });
    if (error) throw error;

    const { id } = req.params;

    const car = await CarRepository.listById(id);

    if (car) {
      req.car = car;
      next();
    } else {
      return res.status(404).json({ message: 'Car ID not exist' });
    }
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
