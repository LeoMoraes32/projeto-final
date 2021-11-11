const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const RentalSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true
    },
    cnpj: {
      type: String,
      required: true,
      unique: true
    },
    atividades: {
      type: String,
      required: true
    },
    endereco: [
      {
        cep: {
          type: String,
          required: true
        },
        logradouro: {
          type: String,
          required: true
        },
        complemento: {
          type: String,
          required: false
        },
        bairro: {
          type: String,
          required: true
        },
        number: {
          type: String,
          required: true
        },
        localidade: {
          type: String,
          required: true
        },
        uf: {
          type: String,
          enum: [
            'AC',
            'AL',
            'AP',
            'AM',
            'BA',
            'CE',
            'DF',
            'ES',
            'GO',
            'MA',
            'MT',
            'MS',
            'MG',
            'PA',
            'PB',
            'PR',
            'PE',
            'PI',
            'RJ',
            'RN',
            'RS',
            'RO',
            'RR',
            'SC',
            'SP',
            'SE',
            'TO'
          ],
          required: true
        },
        isFilial: {
          type: Boolean,
          required: true
        }
      }
    ]
  },
  {
    versionKey: false
  }
);

RentalSchema.plugin(mongoosePaginate);

const Rental = mongoose.model('Rental', RentalSchema);

module.exports = Rental;
