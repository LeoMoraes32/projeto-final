const CnpjInvalid = require('../errors/rentalError/CnpjInvalid');

class ValidCnpj {
  verifyCnpj(cnpj) {
    const newCnpj = cnpj.replace(/[^\d]+/g, '');

    if (newCnpj === '') throw new CnpjInvalid(cnpj);

    if (newCnpj.length !== 14) throw new CnpjInvalid(cnpj);

    if (
      newCnpj === '00000000000000' ||
      newCnpj === '11111111111111' ||
      newCnpj === '22222222222222' ||
      newCnpj === '33333333333333' ||
      newCnpj === '44444444444444' ||
      newCnpj === '55555555555555' ||
      newCnpj === '66666666666666' ||
      newCnpj === '77777777777777' ||
      newCnpj === '88888888888888' ||
      newCnpj === '99999999999999'
    )
      throw new CnpjInvalid(cnpj);

    let size = newCnpj.length - 2;
    let numbers = newCnpj.substring(0, size);
    const digits = newCnpj.substring(size);
    let sum = 0;
    let pos = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    const digitsOne = parseInt(digits.chartAt(0), 10); 
    if (resultado !== digitsOne) throw new CnpjInvalid(cnpj);

    size += 1;
    numbers = newCnpj.substring(0, size);
    sum = 0;
    pos = size - 7;
    for (let j = size; j >= 1; j--) {
      sum += numbers.charAt(size - j) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    const digitsTwo = parseInt(digits.chartAt(0), 10);
    if (resultado !== digitsTwo) throw new CnpjInvalid(cnpj);
  }
}
module.exports = new ValidCnpj();
