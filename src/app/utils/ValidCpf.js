const CpfInvalid = require('../errors/peopleError/CpfInvalid');

class ValidCpf {
  verifyCpf(cpf) {
    const formatedCpf = cpf.replace('.', '').replace('.', '').replace('-', '');

    let sum;
    let rest;
    sum = 0;

    if (formatedCpf === '00000000000') throw new CpfInvalid(cpf);

    for (let item = 1; item <= 9; item++) sum += parseInt(formatedCpf.substring(item - 1, item), 10) * (11 - item);
    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(formatedCpf.substring(9, 10), 10)) throw new CpfInvalid(cpf);

    sum = 0;
    for (let item = 1; item <= 10; item++) {
      sum += parseInt(formatedCpf.substring(item - 1, item), 10) * (12 - item);
    }
    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(formatedCpf.substring(10, 11), 10)) throw new CpfInvalid(formatedCpf);
  }
}
module.exports = new ValidCpf();
