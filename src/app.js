const express = require('express');
const cors = require('cors');
const logger = require('volleyball');
const passport = require('passport');
const UserRoute = require('./routes/User/UserRoute');
const CompanyRoute = require('./routes/Company/CompanyRoute');
const JobRoute = require('./routes/Job/JobRoute');
const ProfileRoute = require('./routes/Profile/ProfileRoute');
require('./auth/auth');

const app = express();
app.use(cors());
app.use(logger);

/**
 * Routes
 */
app.use('/api/', UserRoute);
// We plugin our jwt strategy as a middleware so only verified users can access this route
app.use('/api/company', passport.authenticate('jwt', { session: false }), CompanyRoute);
app.use('/api/job', passport.authenticate('jwt', { session: false }), JobRoute);
app.use('/api/profile', passport.authenticate('jwt', { session: false }), ProfileRoute);

// Handle errors
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const error = err;
  res.status(error.status || 500);
  delete error.status;
  res.json({ error });
});

module.exports = app;
