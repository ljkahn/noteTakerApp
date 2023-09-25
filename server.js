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


//html routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public.index.html'))
})
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


app.get('/api/notes', (req, res) => {
  sendFile(path.join(__dirname, '/public/notes.html'))

});



//api routes

app.get("/api/notes", (req, res) => {
  fsUtils.readFromFile("./db/db.json").then((data) => {
    console.log(JSON.parse(data));
    res.json(JSON.parse(data));
  });
});



app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // Variable for the object we will save
  const userNote = {
    title,
    text,
    note_id: uuid(),
  };

  fsUtils.readAndAppend(userNote, './db/db.json');
  console.log(userNote);
  res.json('Note has been added!');



});

//

app.delete('/api/notes/:id', (req, res) => {
  fsUtils.deleteAndAppend(req.params.id, './db/db.json')
  res.json('Note has been deleted!')

})



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);