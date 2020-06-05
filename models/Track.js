const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TrackSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  imageData: {
    type: Object,
    required: true,
    default: null
  },
  date: {
    type: Date,
    default: Date.now
  },
  generatedLine: {
    type: Array,
    default: null,
    required: false
  }
});

module.exports = Track = mongoose.model("tracks", TrackSchema);