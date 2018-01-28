'use strict';

const Mongoose = require('mongoose');
const RestHapi = require('rest-hapi');
const Hapi = require('hapi');
const Config = require('./config');

function api () {
  let server = new Hapi.Server();
  
  RestHapi.config = Config.restHapiConfig;
  server.connection(RestHapi.config.server.connection);
  
  server.register({
    register: RestHapi,
    options: {
      mongoose: Mongoose
    }
  }, () => {
    server.start(
      RestHapi.logUtil.logActionComplete(
        RestHapi.logger, "Server Initialized", server.info
      )
    );
  });
  return server;
}

module.exports = api();