'use strict';

module.exports = (mongoose) => {
  const modelName = "attendance";
  const Types = mongoose.Schema.Types;
  const Schema = new mongoose.Schema({
    activity: {
      type: Types.ObjectId,
      ref: "activity"
    },
    module: {
      type: Types.ObjectId,
      required: true
    },
    time: {
      type: Types.Date,
      required: true
    },
    // qrdata: {
    //   type: Types.ObjectId,
    //   ref: "qrdata"
    // },
    // student_barcodes: [{
    //   type: Types.Number
    // }]
    // student_attended: {
    //     type: Types.Boolean,
    //     required: true
    // }
  }, { collection: modelName });
  
  Schema.statics = {
    collectionName: modelName,
    routeOptions: {
      associations: {
        activity: {
          type: "ONE_ONE",
          model: "activity"
        },
        module: {
          type: "MANY_ONE",
          model: "module"
        },
        students: {
          type: "_MANY",
          model: "student"
        },
        // qrdata: {
        //   type: "ONE_ONE",
        //   model: "qrdata"
        // }
      }
    }
  };
  
  return Schema;
}