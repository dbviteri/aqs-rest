const JWT = require('jsonwebtoken');
const Mongoose = require('mongoose');
const {JWT_SECRET} = require('../config').constants;

function createToken(professor, expiration, logger) {
  let token = {};

  const profToken = {
    name: professor.name,
    surname: professor.surname,
    prof_number: professor.professor_number,
  };

  token = JWT.sign({
    prof: profToken,
  },
  JWT_SECRET,
  {
    algorithm: 'HS256',
    expiresIn: expiration,
  });

  return token;

  // if (session) {
  //   token = JWT.sign({
  //     sessionId: session._id,
  //     sessionKey: session.key,
  //     passworHash: session.passworHash,
  //   },
  //   constants.JWT_SECRET,
  //   {
  //     algorithm: 'HS256',
  //     expiresIn: expiration,
  //   });
  // } else {
  //   const profToken = {

  //   }
  // }
};

module.exports = createToken;