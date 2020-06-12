const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
//import model
const db = require('./models/model')
// connect to db

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
db.query('SELECT * FROM "user".members ').then(res => { //.members ... where email...etc
  //Query examples https://www.tutorialspoint.com/postgresql/postgresql_select_query.html;
  console.log(res.rows)
}).catch(err => console.error(err.stack))
  //collect user data
const text = 'INSERT INTO "user".members (name, email, password) VALUES($1, $2, $3) RETURNING *';
const values = ['noreturn', 'noReturn@email.com', 'sd23sdf12'];
  db.query(text, values,
 (err, res) => {
    console.log(err, res)
  })

  res.end();
});
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
