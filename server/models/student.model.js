'use strict';

module.exports = (mongoose) => {
  const modelName = "student";
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
    number: {
      type: Number,
      unique: true,
      required: true
    },
    barcode: {
      type: String,
      unique: true,
      required: true
    }
  }, { collection: modelName });
  
  Schema.statics = {
    collectionName: modelName,
    routeOptions: {
      associations: {
        modules: {
          type: "MANY_MANY",
          model: "module"
        },
        attendances: {
          type: "ONE_MANY",
          foreignField: "student",
          model: "attendance"
        }
      }
    }
  };
  
  return Schema;
}