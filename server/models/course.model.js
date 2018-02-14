'use strict';

module.exports = (mongoose) => {
  const modelName = "course";
  const Types = mongoose.Schema.Types;
  const Schema = new mongoose.Schema({
    title: {
      type: Types.String,
      required: true
    }
  }, { collection: modelName });
  
  Schema.statics = {
    collectionName: modelName,
    routeOptions: {
      associations: {
        module: {
          type: "ONE_MANY",
          foreign_field: "course",
          model: "module"
        },
      }
    }
  };
  
  return Schema;
}