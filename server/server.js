const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
//import model
const db = require('./models/model')
// connect to db
const bcrypt = require('bcrypt');
const saltRounds = 10;
const fs = require('fs');
const jwt = require('jsonwebtoken');
const privateKEY  = fs.readFileSync(__dirname + '/private.key', 'utf8');
const publicKEY  = fs.readFileSync(__dirname + '/public.key', 'utf8');
const signOptions = {
  expiresIn: "12h",
  algorithm: "RS256"
};
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

// routes
app.get('/', (req, res) => { //Landing page
  res.json({ info: 'Node.js, Express, and Postgres API' });
  res.end();
});

app.get('/login', (req, res) => { //handle login
  res.redirect(302, '/dashboard') //requires status 302 to work
  res.end();
});

app.get('/dashboard', (req, res) => { //handle login
  res.status(200).send('Were at Dashboard!')
  res.end();
});

app.get('/signup', (req, res) => { //handle login
  //check if email exists
  let { firstName, lastName, email, password } = {firstName:'test', lastName:'test1', email:'hash12@gmail.com', password:'test3'}
db.query(`select email from "user".members
where email = '${email}'`).then(queryRes => {
    if (queryRes.rows.length > 0) {
      console.log('Email exists')
      //Email exists error
    } else { //send info to database
       const payload = {
         email,
       }
      const token = jwt.sign(payload, privateKEY, signOptions);
      //encrypt PW
      bcrypt.hash(password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
        const text = `INSERT INTO "user".members(firstName, lastName, email, password) VALUES ('${firstName}', '${lastName}', '${email}', '${hash}')`
        db.query(text).then(response => {
          console.log('Successfully added new user & encrypted pw');
          res.send({token: token});
        }).catch(err => console.error(err.stack));
      });
    }
  }).catch(err => console.error(err.stack));
  // res.end();
  //Query examples https://www.tutorialspoint.com/postgresql/postgresql_select_query.html;
})
  //collect user data

//global unknown route handler
app.get('*', (req, res)=> {
  res.sendStatus(404);
})
//global error handler
app.use(function(err, req, res, next) {
  const defaultError = {
    log: 'Express error handler caught and unknown middleware error',
    status: 400,
    message: {err: 'An error has occured'},
  }
  const newErr = Object.assign(defaultError, err); //reassigning error
  console.error(newErr.log);
  res.status(newErr.status).send(newErr.message);
})


app.listen(port); //3000

console.log(`Listening on ${port} at: http://localhost:${3000}`);




//
