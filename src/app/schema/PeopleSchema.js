const mongoose = require('mongoose');
const crypto = require('crypto');
const mongoosePaginate = require('mongoose-paginate');
const uniqueValidator = require('mongoose-unique-validator');

const PeopleSchema = new mongoose.Schema({
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
        type: Date,
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
        set: value => crypto.createHash('md5').update(value).digest('hex'),

    },
    habilitado: {
        type: String,
        required: true,
        enum: ['sim','não']
    }
});

PeopleSchema.plugin(uniqueValidator);
PeopleSchema.plugin(mongoosePaginate);

const People = mongoose.model('People', PeopleSchema);

module.exports = People;
