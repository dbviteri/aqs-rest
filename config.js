'use strict';

exports.constants = Object.freeze ({
  PORT: 8125,
  SERVER_TITLE: 'Attendance System REST Api'
})

exports.restHapiConfig = {
  appTitle: this.constants.SERVER_TITLE,
  mongo: {
    URI: 'mongodb://localhost/att-rest'
  },
  server: {
    connection: {
      port: this.constants.PORT
    }
  },
  enableAuditLog: false,
  enableCreatedAt:false,
  enableUpdatedAt:false,
  enableDeletedAt:false,
  enableCreatedBy:false,  
  enableUpdatedBy:false,
  enableDeletedBy:false,
  absoluteModelPath: true,
  modelPath: __dirname + '/server/models'
}