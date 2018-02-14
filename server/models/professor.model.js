'use strict';
const Bcrypt = require('bcryptjs');

module.exports = (mongoose) => {
  
  const modelName = "professor";
  const Types = mongoose.Schema.Types;
  const Schema = new mongoose.Schema({
    name: {
      type: Types.String,
      required: true
    },
    surname: {
      type: Types.String,
      required: true
    },
    professor_number: {
      type: Types.Number,
      unique: true,
      required: true
    },
    password: {
      type: Types.String,
      required: true
    }
  }, { collection: modelName });
  
  Schema.statics = {
    collectionName: modelName,
    routeOptions: {
      associations: {
        modules: {
          type: "ONE_MANY",
          foreignField: "professor",
          model: "module"
        }
      },
      create: {
        pre: (payload, request, Log) => {
          return mongoose.model('professor').generatePassword(payload.password, Log)
            .then(hashedPassword => {
              payload.password = hashedPassword.hash;
              return payload;
            })
        }
      }
    },

    generatePassword: (password, Log) => {
      return Bcrypt.genSalt(10)
        .then(salt => {
          return Bcrypt.hash(password, salt);
        })
        .then(hash => {
          return { password, hash };
        });
    },

    findByCredentials: function(professor_number, password, Log) {
      const self = this;
      const query = {
        professor_number: parseInt(professor_number)
      };

      let professor = {};

      return self.findOne(query).lean()
        .then(result => {
          professor = result;

          if (!professor) { return false; }

          const source = professor.password;

          return Bcrypt.compare(password, source);
        })
        .then(passwordMatch => {
          if (passwordMatch) {
            return professor;
          }
        })
    },
  };
  
  return Schema;
}