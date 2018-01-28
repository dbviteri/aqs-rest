'use strict';

module.exports = (mongoose) => {
  const modelName = "attendance";
  const Types = mongoose.Schema.Types;
  const Schema = new mongoose.Schema({
    lecture: {
      type: Types.ObjectId,
      ref: "lecture"
    },
    module: {
      type: Types.ObjectId,
      required: true
    },
    time: {
      type: Types.Date,
      required: true
    }
    // student_attended: {
    //     type: Types.Boolean,
    //     required: true
    // }
  }, { collection: modelName });
  
  Schema.statics = {
    collectionName: modelName,
    routeOptions: {
      associations: {
        lecture: {
          type: "ONE_ONE",
          model: "lecture"
        },
        module: {
          type: "MANY_ONE",
          model: "module"
        },
        students: {
          type: "_MANY",
          model: "student"
        }
      }
    }
  };
  
  return Schema;
}