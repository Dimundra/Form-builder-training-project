const JWT = require('jsonwebtoken');
const secret = require('../const.js');

function buildToken(id) {
  const payloadForJWT = { id };
  const expirationTimeOfJWT = '30000ms'; // 30 sec
  const token = JWT.sign(payloadForJWT, secret, {
    expiresIn: expirationTimeOfJWT,
  });
  return { token: token };
}

module.exports = buildToken;
