const mongoose = require('mongoose');

const { Schema } = mongoose;

const JobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    locations: [
      {
        type: String,
      },
    ],
    compensation: {
      min: Number,
      max: Number,
    },
    skills: [
      {
        type: String,
      },
    ],
    available: Boolean,
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
    },
    applicants: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const JobModel = mongoose.model('Job', JobSchema);

module.exports = JobModel;
