const serialize = ({ _id, modelo, cor, ano, acessorios, quantidadePassageiros }) => ({
  _id,
  modelo,
  cor,
  ano,
  acessorios,
  quantidadePassageiros
});

const paginateSerialize = ({ docs, limit, totalDocs, pageCounter, totalPages }) => ({
  veiculos: docs.map(serialize),
  limit,
  total: totalDocs,
  offset: pageCounter,
  offsets: totalPages
});

module.exports = { serialize, paginateSerialize };
