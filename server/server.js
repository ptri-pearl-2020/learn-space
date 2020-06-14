/* eslint-disable prettier/prettier */
const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 3000;

// import model and connect to the database
const db = require('./models/model');

const saltRounds = 10;

const privateKEY = fs.readFileSync(`${__dirname}/private.key`, 'utf8');
const publicKEY = fs.readFileSync(`${__dirname}/public.key`, 'utf8');
const signOptions = {
  expiresIn: '36h',
  algorithm: 'RS256'
};

// express app to handle JSON and url encoding
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

// format email by converting to lowercase, and removing periods in email handle
const emailFormatter = userEmail => {
  // Parse email to remove '.' and make it case insensitive
  const emailParts = userEmail.toLowerCase().split('@');
  const emailName = emailParts[0].replace(/\.+/g, '');
  emailParts[0] = emailName;
  const formattedEmail = emailParts.join('@');

  return formattedEmail;
};

/**
 * Server Routes
 */

// Landing page
app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
  res.end();
});

// Login
app.get('/login', async (req, res) => {
  const { email, password } = { email: 'sam..jackson@gmail.com', password: 'abc%123' };
  const scrubbedEmail = emailFormatter(email);
  console.log('scrubbedEmail =', scrubbedEmail);
  const emailQuery = `
    SELECT * FROM "user".members
    WHERE email = '${scrubbedEmail}'
  `;


  try {
    const userData = await db.query(emailQuery);
    const hashedPassword = userData.rows[0].password;
    const validUserLogin = await bcrypt.compare(password, hashedPassword);

    // return validUserLogin boolean to the frontend
    return res.json({ validUserLogin });
  } catch (error) {
    return res.status(422).json({ errors: [{ message: `No matching email found in the database` }] });
  }
});

// User signup information validation, bcrypt password, return JWT
app.get('/signup', async (req, res) => {
  // check if email exists
  // const { firstName, lastName, email, password } = {
  //   firstName: 'Samuel',
  //   lastName: 'Jackson',
  //   email: 'Sam.Jackson@gmail.com',
  //   password: 'abc%123'
  // };
  const { firstName, lastName, email, password } = {
    firstName: 'Lucy',
    lastName: 'Van Pelt',
    email: 'Lucy.Van.Pelt@email.com',
    password: 'T7b1$gh'
  };
  const scrubbedEmail = emailFormatter(email);
  console.log('scrubbedEmail =', scrubbedEmail);
  // SQL query to check if email already exist in the DB
  const emailQuery = `
    SELECT email FROM "user".members
    WHERE email = '${scrubbedEmail}'
  `;

  // Query the database for signup email
  let emailQueryRes= null;

  try {
    emailQueryRes = await db.query(emailQuery);
  } catch (error) {
    return res.status(400).json({ errors: [{ message: 'Invalid email' }] });
  }

  // If email exists error, return JSON message
  if (emailQueryRes.rows.length > 0) {
    return res.status(422).json({ errors: [{ message: 'Email is already registered' }] });
  }

  // If email is available store user registration information in the DB
  const payload = {
    email
  };
  // generate Jason Web Token for frontend authenticated user storage
  const token = jwt.sign(payload, privateKEY, signOptions);
  // encrypt password with Bcrypt
  let hashedPassword = null;

  try {
    hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('hashedPassword =', hashedPassword);
  } catch (error) {
    return res.status(400).json({ errors: [{ message: `Bcrypt hashing error: ${error}` }] });
  }

  // Store user signup information with encrypted password into DB.
  const insertUserQuery = `
    INSERT INTO "user".members (firstName, lastName, email, password)
    VALUES ('${firstName}', '${lastName}', '${scrubbedEmail}', '${hashedPassword}')`;

  try {
    const dbInsertResponse = await db.query(insertUserQuery);
    console.log(`\nSuccessfully added new user and encrypted password with: ${dbInsertResponse.command} and ${dbInsertResponse.rowCount} row inserted\n`);
    return res.send({ token });
  } catch (error) {
    return res.status(400).json({ errors: [{ message: `Datbase user save error: ${error}` }] });
  }
});

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

app.listen(port); // 3000

console.log(`Listening on ${port} at: http://localhost:${3000}`);

//
