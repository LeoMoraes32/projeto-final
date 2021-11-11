const Joi = require('joi');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      modelo: Joi.string().min(3).trim(),
      cor: Joi.string().min(3).trim(),
      ano: Joi.number().min(1950).max(2022),
      acessorios: Joi.array()
        .min(1)
        .unique()
        .items({ descricao: Joi.string().min(3).trim() }),
      quantidadePassageiros: Joi.number()
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
