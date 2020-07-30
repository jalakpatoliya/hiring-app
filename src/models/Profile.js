const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProfileSchema = new Schema({
  about: {
    type: String,
    required: true,
  },
  locations: [
    {
      type: String,
    },
  ],
  ectc: {
    min: Number,
    max: Number,
  },
  experience: Number,
  email: {
    type: String,
    default: null,
    validate: {
      validator: (email) => {
        if (email) {
          const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(String(email).toLowerCase());
        }
        return true;
      },
      message: 'Provided email is invalid.',
    },
  },
  skills: [
    {
      type: String,
    },
  ],
  available: Boolean,
  applied: [
    {
      job: { type: Schema.Types.ObjectId, ref: 'Job' },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  rejected: [
    {
      job: { type: Schema.Types.ObjectId, ref: 'Job' },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const ProfileModel = mongoose.model('Profile', ProfileSchema);

module.exports = ProfileModel;
