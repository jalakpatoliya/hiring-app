/* eslint-disable no-console */
const mongoose = require('mongoose');

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-wiof7.mongodb.net/<dbname>?retryWrites=true&w=majority`,
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
