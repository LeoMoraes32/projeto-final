const serialize = ({ _id, id_carro, id_locadora, status, valor_diaria, placa }) => {
  return { _id, id_carro, id_locadora, status, valor_diaria, placa };
};

const paginateSerialize = ({ docs, limit, totalDocs, pageCounter, totalPages }) => ({
  frota: docs.map(serialize),
  limit,
  total: totalDocs,
  offset: pageCounter,
  offsets: totalPages
});

module.exports = { serialize, paginateSerialize };
