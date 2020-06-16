const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

// import model and connect to the database
const db = require('../models/model');

// format email by converting to lowercase, and removing periods in email
const emailFormatter = require('../helpers/emailFormatter');

router.post('/login', async (req, res) => {
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
    return res
      .status(422)
      .json({ errors: [{ message: `No matching email found in the database` }] });
  }
});

module.exports = router;
