const jwt = require('jsonwebtoken');
const auth = require('../config/auth.json');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, auth.secret);
    console.log(req);
    req.usuario = decode;
    return next();
  } catch (error) {
    return res.status(400).json({ description: error.path, name: error.message });
  }
};
