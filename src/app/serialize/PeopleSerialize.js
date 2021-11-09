const moment = require('moment');
const serialize = ({_id, nome, cpf, data_nascimento, email, habilitado}) => {
    data_nascimento = moment(data_nascimento, 'YYYY-MM-DD').format('DD/MM/YYYY');
    return { _id, nome, cpf, data_nascimento, email, habilitado };
}

const paginateSerialize = ({ docs, limit, totalDocs, pageCounter, totalPages}) => {
    return { 
        pessoas: docs.map(serialize), 
        limit, 
        total: totalDocs, 
        offset: pageCounter, 
        offsets: totalPages, 
    };
}

module.exports = {serialize, paginateSerialize};