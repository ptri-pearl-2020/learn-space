const express = require('express');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

// import model and connect to the database
const db = require('../models/model');

// Hash and authentication variables
const saltRounds = 10;
const privateKEY = fs.readFileSync(path.join(__dirname, '../', 'private.key'), 'utf8');
// const publicKEY = fs.readFileSync(`${__dirname}/public.key`, 'utf8');
const signOptions = {
  expiresIn: '36h',
  algorithm: 'RS256'
};

// format email by converting to lowercase, and removing periods in email
const emailFormatter = require('../helpers/emailFormatter');

router.post('/signup', async (req, res) => {
  // check if email exists
  const { firstName, lastName, email, password } = req.body;
  // consistently format email to lowercase and no periods stored in DB
  const scrubbedEmail = emailFormatter(email);

  // SQL query to check if email already exist in the DB
  const emailQuery = `
    SELECT email FROM "user".members
    WHERE email = '${scrubbedEmail}'
  `;

  // Query the database for signup email
  let emailQueryRes = null;

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
  } catch (error) {
    return res.status(400).json({ errors: [{ message: `Bcrypt hashing error: ${error}` }] });
  }

  // Store user signup information with encrypted password into DB.
  const insertUserQuery = `
    INSERT INTO "user".members (firstName, lastName, email, password)
    VALUES ('${firstName}', '${lastName}', '${scrubbedEmail}', '${hashedPassword}')`;

  try {
    await db.query(insertUserQuery);

    return res.send({ token });
  } catch (error) {
    return res.status(400).json({ errors: [{ message: `Datbase user save error: ${error}` }] });
  }
});

module.exports = router;
