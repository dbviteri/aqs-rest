'use strict';
var shortid = require('shortid');

module.exports = (mongoose) => {
  const modelName = "qrdata";
  const Types = mongoose.Schema.Types;
  const Schema = new mongoose.Schema({
    _id: {
      type: Types.String,
      'default': shortid.generate
    },
    professor_name: {
      type: Types.String,
      required: true
    },
    module_code: {
      type: Types.String,
      required: true
    },
    activity_type: {
      type: Types.String,
      required: true
    },
    attendance_id: {
      type: Types.ObjectId,
      required: true
    }
  }, { collection: modelName });
  
  Schema.statics = {
    collectionName: modelName,
    routeOptions: {
      associations: {
    //     attendance: {
    //       type: "ONE_ONE",
    //       model: "attendance"
    //     }
      }
    }
  }

  return Schema;
}