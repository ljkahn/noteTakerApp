const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const db = require('./db.json')
const app = express();
const fsUtils = require('./helpers/fsUtils');
const uuid = require('./helpers/uuid')
const fs = require('fs');


//middleware for parsing jason and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


//GET for homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET request for notes
app.get('/api/notes', (req, res) => {
  // Send a message to the client
  res.json(`${req.method} request received to get notes`);

  // Log our request to the terminal
  console.info(`${req.method} request received to get notes`);
});





app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);