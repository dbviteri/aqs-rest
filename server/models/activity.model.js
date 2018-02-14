'use strict';

// Lecture, workshop, seminar, etc
module.exports = (mongoose) => {
  const modelName = "activity";
  const Types = mongoose.Schema.Types;
  const Schema = new mongoose.Schema({
    module: {
      type: Types.ObjectId,
      required: true
    },
    type: {
      type: Types.String,
      enum: ['LEC', 'SEM', 'LAB'],
      default: 'LEC',
      required: true,
    },
    start: {
      type: Types.Date,
      required: true
    },
    end: {
      type: Types.Date,
      required: true
    },
    attendance: {
      type: Types.ObjectId,
      ref: "attendance"
    }
  }, { collection: modelName });
  
  Schema.statics = {
    collectionName: modelName,
    routeOptions: {
      associations: {
        module: {
          type: "MANY_ONE",
          model: "module"
        },
        attendance: {
          type: "ONE_ONE",
          model: "attendance"
        }
      }
    }
  };
  
  return Schema;
}