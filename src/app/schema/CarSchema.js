const mongoose = require('mongoose');

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

const Car = mongoose.model('Car', CarSchema);

module.exports = Car;