const Joi = require('joi');

let currentDate = new Date();
console.log(currentDate);
let newDate = currentDate - 18;
console.log(newDate);

module.exports = async (req, res, next) => {
    try{
        const schema = Joi.object({
            name: Joi.string().min(3),
            cpf: Joi.string().min(11).max(14),
            dateOfBirth: Joi.date(),
            email: Joi.string().email().lowercase(),
            password: Joi.string().min(6),
            license: Joi.string().min(3).max(3)
        });
        const { error } = await schema.validate(req.body, { abortEarly: true });
        if (error) throw error
        return next();
    }catch (error) {
        return res.status(400).json(error);
    }
} 
