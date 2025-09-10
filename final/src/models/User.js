const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, lowercase: true },  // optional ab
    message: { type: String, required: true },
    rating: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);

