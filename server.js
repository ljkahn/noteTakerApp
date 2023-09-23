const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const db = require('./db/db.json')
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

// GET request for notes.html file




//GET for api/notes

app.get('/notes', (req, res) => {
  console.info(`GET /api/notes`);
  res.status(200).json(db);

  // Log our request to the terminal
  console.info(`${req.method} request received to get notes`)
});



app.post('/api/notes', (req, res) => {
  // Log that a POST request was received

  //get data from the front end - req.body
  //create varaibles of that data
  //validation - user must provide title, text, and a uuid for each note
  //create new object of the user values 
  //write that data to a json file
  //confirm the data was written
  //send a response back to client of the data 





  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    // Convert the data to a string so we can save it
    const noteString = JSON.stringify(newNote);

    // Write the string to a file
    fs.writeFile(`./db/${newNote.product}.json`, noteString, (err) =>
      err
        ? console.error(err)
        : console.log(
          `Review for ${newNote.product} has been written to JSON file`
        )
    );

    const response = {
      status: 'success',
      body: newReview,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting review');
  }
});



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);