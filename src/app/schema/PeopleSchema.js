const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const mongoosePaginate = require('mongoose-paginate-v2');

const PeopleSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true
    },
    cpf: {
      type: String,
      required: true,
      unique: true
    },
    data_nascimento: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true
    },
    senha: {
      type: String,
      required: true,
      select: false
    },
    habilitado: {
      type: String,
      required: true,
      enum: ['sim', 'não']
    }
  },
  {
    versionKey: false
  }
);

PeopleSchema.pre('save', async function encrypted(next) {
  const hash = await bcrypt.hash(this.senha, 10);
  this.senha = hash;

  next();
});

PeopleSchema.plugin(mongoosePaginate);

const People = mongoose.model('People', PeopleSchema);

module.exports = People;
