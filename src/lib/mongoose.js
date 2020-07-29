/* eslint-disable no-console */
const mongoose = require('mongoose');

mongoose.connect(
  `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ds249372.mlab.com:49372/hiring-app`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, data) => {
    if (err) {
      console.log('connection error', err);
    } else {
      console.log('DB connected sucessfully');
    }
  }
);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;
