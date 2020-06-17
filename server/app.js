/* eslint-disable prettier/prettier */
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');

const app = express();
const port = process.env.PORT || 3000;

// Serve favicon for the site
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// Handle Cors and Authentication
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.set("Access-Control-Allow-Headers", "X-Requested-With, content-type, Authorization, x-auth-token");
  return next();
});

// route files
const loginRoute = require('./routes/login');
const signUpRoute = require('./routes/signup');

// express app to handle JSON and url encoding
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

/**
 * Server Routes
 */

// Landing page
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Learn Space</h1>');
  res.end();
});

// Login
app.use(loginRoute);

// User signup information validation, bcrypt password, return JWT
app.use(signUpRoute);

// global unknown route handler
app.get('*', (req, res) => {
  res.sendStatus(404);
});

// global error handler
app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Express error handler caught and unknown middleware error',
    status: 400,
    message: { err: 'An error has occured' }
  };
  const newErr = Object.assign(defaultError, err); // reassigning error
  console.error(newErr.log);
  res.status(newErr.status).send(newErr.message);

  return next();
});

// Listen on port 3000
app.listen(port);

console.log(`Listening on ${port} at: http://localhost:${3000}`);
