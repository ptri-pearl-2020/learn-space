const express = require('express');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const privateKEY = fs.readFileSync(path.join(__dirname, '../', 'private.key'), 'utf8');

const router = express.Router();

// import model and connect to the database
const db = require('../models/model');

router.get('/courses/:id', async (req, res) => {
  const token = req.header('x-auth-token');

  if (!token) return res.status(400).json({ errors: [{ message: 'No token set' }] });
  // translate token > userID
  const { userId } = jwt.verify(token, privateKEY);

  // determine that user has valid Token;
  // search DB user.members for user with this ID
  const userQuery = `
    SELECT m.user_id FROM "user".members m WHERE m.user_id = '${userId}';
  `;
  try {
    const userData = await db.query(userQuery);

    if (userData.rows.length === 0) {
      throw new Error('No such user');
    }
  } catch (err) {
    return res.status(422).json({ errors: [{ message: err.message }] }); //
  }
  // show requested questiosn
  const quesAnsQuery = `select questions, a.id, a.answer_text from courses.questions as q INNER JOIN courses.answers as a on q.id=a.question_id
where course_id='${req.params.id}'`;
  try {
    // run question answer query
    const answerResult = await db.query(quesAnsQuery);
    console.log('answerResult =', answerResult.rows);
    // send query result to the frontend
    return res.json(answerResult.rows);
  } catch (err) {
    return res.status(422).json({ errors: [{ message: err.message }] });
  }
});

module.exports = router;
