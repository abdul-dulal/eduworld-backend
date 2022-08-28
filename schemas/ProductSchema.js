const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = {
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  user: {
    type: String,
  },
  suppiler: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
};

module.exports = productSchema;
