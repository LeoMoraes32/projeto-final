const { date } = require('joi');
const mongoose = require('mongoose');

const PeopleSchema = new mongoose.Schema({
    name: String,
    cpf: String,
    dateOfBirth: Date,
    email: String,
    password: String,
    license: Boolean
})

const People = mongoose.model('People', PeopleSchema);

module.exports = People;
