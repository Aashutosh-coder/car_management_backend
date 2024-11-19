const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const carSchema  = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], required:true, validate: [arrayLimit, '{PATH} exceeds the limit of 10'] },
    tags: { type: [String], required: true }, 
}, { timestamps: true });



function arrayLimit(val) {
    return val.length <= 10;
  }
  
  module.exports = mongoose.model('car', carSchema);