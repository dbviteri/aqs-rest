'use strict';
const Joi = require('joi');
const Boom = require('boom');
const createToken = require('../token');
const { EXPIRATION_PERIOD } = require('../../config').constants;

module.exports = (server, mongoose, logger) => {
  // Login
    const Professor = mongoose.model('professor');

    logger.note("LOGIN ENDPOINT");

    const authenticate = [
      {
        assign: 'professor',
        method: (request, reply) => {
      
          const professor_number = request.payload.professor_number;
          const password = request.payload.password;
    
          Professor.findByCredentials(professor_number, password, logger)
            .then(professor => {
              return reply(professor);
            })
            .catch(error => {
              logger.error(error);
              return reply(Boom.gatewayTimeout("An error ocurred."));
            })
        }
      },
      {
        assign: 'token',
        method: (request, reply) => {
          reply(createToken(request.pre.professor, EXPIRATION_PERIOD, logger));
        }
      }
    ];

    const loginHandler = (request, reply) => {
      let header = "Bearer " + request.pre.token;
      let response = {};

      request.pre.professor.password = "";

      response = {
        professor: request.pre.professor,
        header,
      }

      return reply(response);
    }
  
    server.route({
      method: 'POST',
      path: '/login',
      config: {
        handler: loginHandler,
        auth: null,
        description: 'Professor login',
        validate: {
          payload: {
            professor_number: Joi.number().required(),
            password: Joi.string().required()
          }
        },
        pre: authenticate,
        plugins: {
          'hapi-swagger': {
            responseMessages: [
              { code: 200, message: 'Success' },
              { code: 400, message: 'Bad Request' },
              { code: 404, message: 'Not Foundss' },
              { code: 500, message: 'Internal Server Error' }
            ]
          }
        }
      }
    })

  
}
