const mongoose = require("mongoose");
const { Schema } = mongoose;

const testSchema = new Schema({
  title: {
       type: String,
       minlength: [3, 'this is too shoot'],
       required: true
    }, 
  author: String,
});

module.exports = mongoose.model('test', testSchema)