const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const db = require('./db/db.json')
const app = express();
const fsUtils = require('./helpers/fsUtils');
const uuid = require('./helpers/uuid')




//middleware for parsing jason and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


//html routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//api routes
app.get("/api/notes", (req, res) => {
  fsUtils.readFromFile("./db/db.json").then((data) => {
    // console.log(JSON.parse(data));
    res.json(JSON.parse(data));
  });
});

app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
  const userNote = {
    title: title,
    text: text,
    id: uuid(),
  };
  fsUtils.readAndAppend(userNote, "./db/db.json");
  console.log(userNote);
  res.json("Note has been added!✅");
});

app.delete("/api/notes/:id", (req, res) => {
  fsUtils.deleteAndAppend(req.params.id, "./db/db.json")
  res.json("Note has been deleted!🗑️ ")
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);