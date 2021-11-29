const moment = require('moment');

const serialize = ({ _id, id_user, data_inicio, data_fim, id_carro, id_locadora, valor_final }) => {
  data_inicio = moment(data_inicio, 'YYYY-MM-DD').format('DD/MM/YYYY');
  data_fim = moment(data_fim, 'YYYY-MM-DD').format('DD/MM/YYYY');
  return { _id, id_user, data_inicio, data_fim, id_carro, id_locadora, valor_final };
};

const paginateSerialize = ({ docs, limit, totalDocs, pageCounter, totalPages }) => ({
  reservas: docs.map(serialize),
  limit,
  total: totalDocs,
  offset: pageCounter,
  offsets: totalPages
});

module.exports = { serialize, paginateSerialize };
