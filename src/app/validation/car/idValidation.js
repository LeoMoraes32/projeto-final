const CarRepository = require('../../repository/CarRepository');

module.exports = async(req, res, next) =>{
    try{
        const error = await CarRepository.listById(req.params.id);
        if(!error) throw error;
        return next();
    } catch (error) {
        return res.status(404).json("Id dont exist");
    }
}