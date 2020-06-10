const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// routes
app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' });
  res.end();
});

app.listen(port, () => {
  console.log(`Listening on ${port} at: http://localhost:${port}`);
});
