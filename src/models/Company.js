const mongoose = require('mongoose');

const { Schema } = mongoose;

const CompanySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  size: {
    min: Number,
    max: Number,
  },
  market: {
    type: String,
  },
  jobs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Job',
    },
  ],
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const CompanyModel = mongoose.model('Company', CompanySchema);

module.exports = CompanyModel;
