const express = require('express');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// import model and connect to the database
const db = require('../models/model');

// Hash and authentication variables
const privateKEY = fs.readFileSync(path.join(__dirname, '../', 'private.key'), 'utf8');

router.post('/answers', async (req, res) => {
  const { id } = req.body;
    console.log('REQ BODY ID? ', JSON.stringify(req.body))
  // decrypt userid
  const token = req.header('x-auth-token');
  console.log(`GET request to /dashboard ${token}`);
  if (!token) return res.status(422).json({ errors: [{ message: 'No token set' }] });

  const { userId } = jwt.verify(token, privateKEY);
  // check DB if anwser id from req.body is in answers table filter for answer id
  const checkAnswerQuery = `
    SELECT *
    FROM courses.answers c
    WHERE c.id = '${id}';
  `;
  // return boolean correct
  const queryResult = await db.query(checkAnswerQuery);
  const { correct } = queryResult.rows[0];
  // if boolean is true grab user id and increment by 1
  if (correct) {
    const queryScore = `
      UPDATE "user".score_board
      SET score = score + 1
      WHERE user_id = '${userId}'
      RETURNING score;
  `;

    const scoreResult = await db.query(queryScore);
    const { score } = scoreResult.rows[0];

    return res.json({ score });
  }
  // send new score to frontend
  // if boolean is false send message 'incorrect'
  return res.json({ message: 'incorrect' });
});

module.exports = router;
