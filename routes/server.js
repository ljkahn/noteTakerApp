const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const db = require('./db/db.json')
const app = express();


//middleware for parsing jason and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', db)