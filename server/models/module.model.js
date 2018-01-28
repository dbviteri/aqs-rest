'use strict';

module.exports = (mongoose) => {
  const modelName = "module";
  const Types = mongoose.Schema.Types;
  const Schema = new mongoose.Schema({
    title: {
      type: Types.String,
      required: true
    },
    code: {
      type: Types.String,
      required: true,
      unique: true
    },
    professor: {
      type: Types.ObjectId,
      ref: "professor"
    }
  }, { collection: modelName });
  
  Schema.statics = {
    collectionName: modelName,
    routeOptions: {
      associations: {
        lectures: {
          type: "ONE_MANY",
          foreignField: "module",
          model: "lecture"
        },
        attendances: {
          type: "ONE_MANY",
          foreignField: "attendance",
          model: "attendance"
        },
        professor: {
          type: "ONE_ONE",
          model: "professor"
        },
        students: {
          type: "MANY_MANY",
          model: "student"
        }
      }
    }
  };
  
  return Schema;
}