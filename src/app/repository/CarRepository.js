const CarSchema = require('../schema/CarSchema');

class CarRepository {
    async create(payload){
        return await CarSchema.create(payload);
    }
    async list(payload){
        return await CarSchema.paginate(payload, {
            page: payload.page || 1,
            limit: 100
        });
    }

    async listById(payload){
        return await CarSchema.findById(payload);
    }

    async updateById(id, body){
        return await CarSchema.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true
        });
    }

    async patch(idCar, idAcessorios, payload){
        const result = await CarSchema.updateOne
        (
            {
                "acessorios._id":idAcessorios
            },
            {
                "$set": {
                    "acessorios.$.descricao":toString(payload)
                }
            }
        )


        //const Acessorios = [];
        //result.acessorios.forEach((item) => {
          //  if(item.idCar === result.id) Acessorios.push(item);
            //if(item.idAcessorios === result.id) {
              //  Acessorios.push(payload);
                //console.log("foi!");
           // }
       // });
        return result;
    }

    async deleteById(payload){
        return await CarSchema.findByIdAndDelete(payload);
    }
}
module.exports = new CarRepository();