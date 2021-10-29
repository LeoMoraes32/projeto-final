const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const CarSchema = new mongoose.Schema({
    modelo: {
        type: String,
        required: true
    },
    cor: {
        type: String,
        required: true
    },
    ano: {
        type: Number,
        required: true
    },

    acessorios:[{

        descricao:{
          type:String,  
       }
   }],

    quantidadePassageiros: {
        type: Number,
        required: true,
    }
});

CarSchema.plugin(mongoosePaginate);

const Car = mongoose.model('Car', CarSchema);

module.exports = Car;
