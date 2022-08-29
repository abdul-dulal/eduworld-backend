const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  des: {
    type: String,
    required: true,
  },
});

module.exports = blogSchema;
