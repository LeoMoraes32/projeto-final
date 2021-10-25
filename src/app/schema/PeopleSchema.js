const { date } = require('joi');
const mongoose = require('mongoose');

const PeopleSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    data_nascimento: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    senha: {
        type: String,
        required: true
    },
    habilitado: {
        type: String,
        required: true,
        enum: ['sim','não']
    }
})

const People = mongoose.model('People', PeopleSchema);

module.exports = People;
