const express = require('express');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

// import model and connect to the database
const db = require('../models/model');

// Hash and authentication variables
const privateKEY = fs.readFileSync(path.join(__dirname, '../', 'private.key'), 'utf8');
// const publicKEY = fs.readFileSync(`${__dirname}/public.key`, 'utf8');
const signOptions = {
  expiresIn: '36h',
  algorithm: 'RS256'
};

// format email by converting to lowercase, and removing periods in email
const emailFormatter = require('../helpers/emailFormatter');

router.post('/login', async (req, res) => {
  // const { email, password } = { email: 'sam..jackson@gmail.com', password: 'abc%123' };
  const { email, password } = req.body;
  const scrubbedEmail = await emailFormatter(email);
  const emailQuery = `
    SELECT * FROM "user".members
    WHERE email = '${scrubbedEmail}'
  `;

  try {
    const userData = await db.query(emailQuery);
    const hashedPassword = userData.rows[0].password;
    const validUserLogin = await bcrypt.compare(password, hashedPassword);
    // If valid user credentials, return JWT to the frontend
    if (validUserLogin) {
      const payload = {
        email
      };
      // generate Jason Web Token for frontend authenticated user storage
      const token = jwt.sign(payload, privateKEY, signOptions);

      // return validUserLogin boolean to the frontend
      return res.json({ token });
    }
  } catch (error) {
    return res.status(422).json({ errors: [{ message: error.message }] });
  }
});

module.exports = router;
