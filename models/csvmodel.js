const mongoose = require('mongoose');

// Define your schema
const dataSchema = new mongoose.Schema({
  name: String,
  roll: Number,
  // Add other fields as needed based on your CSV columns
});

// Create your model
const Data = mongoose.model('Data', dataSchema);
module.exports = Data