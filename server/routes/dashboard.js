const express = require('express');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const privateKEY = fs.readFileSync(path.join(__dirname, '../', 'private.key'), 'utf8');
const router = express.Router();

// import model and connect to the database
const db = require('../models/model');

// set up route at dashboard for get request to translate token into user id
router.get('/dashboard', async (req, res) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(422).json({ errors: [{ message: 'No token set' }] });

  const { userId } = jwt.verify(token, privateKEY);

  const userQuery = `
    SELECT
      m.user_id,
      m.firstname,
      sb.score
    FROM
      "user".members m
      INNER JOIN "user".score_board sb ON m.user_id = sb.user_id
    WHERE m.user_id = '${userId}';
  `;

  const coursesQuery = `
  SELECT DISTINCT
  c.course_id,
  c.course_name
  FROM courses.classes c
  INNER JOIN "user".enrollments e ON e.course_id = e.course_id
  WHERE e.user_id = '${userId}';
  `;

  // {
  //   name_info: firstName,
  //   courses: [{id, courseName}],
  //   score: 0
  // }
  try {
    const userData = await db.query(userQuery);
    const { firstname, score } = userData.rows[0];
    const courseData = await db.query(coursesQuery);

    // If valid user credentials, return JWT to the frontend
    res.json({ name_info: firstname, courses: courseData.rows, score });
  } catch (error) {
    return res.status(422).json({ errors: [{ message: error.message }] });
  }

  // added return true to handle eslint consistent-return
  return true;
});

module.exports = router;
