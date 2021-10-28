const PeopleRepository = require('../../repository/PeopleRepository');

module.exports = async(req, res, next) =>{
    try{
        const error = await PeopleRepository.listById(req.params.id);
        if(!error) {
            throw error;
        }
        return next();
    } catch (error) {
        return res.status(404).json("Id of people dont exist");
    }
}