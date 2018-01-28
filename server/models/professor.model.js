'use strict';

module.exports = (mongoose) => {
  const modelName = "professor";
  const Types = mongoose.Schema.Types;
  const Schema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    },
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
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
      }
    }
  };
  
  return Schema;
}