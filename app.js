/**
 * Name: Shin Komori
 * Date: November 18, 2022
 *
 * This is the app.js to implement the UI for server side of my webservice,
 * which is a combination of the server side and the client side.
 * It stores the data that contains the list of names and the number that
 * counts how many times names were newly added by users.
 *
 * When user makes a GET request from client side, it returns text of an name.
 * When user makes a POST request to add a new name to the data stored in the
 * server side from client side, it checks the overlap and adds it to the data.
 */

'use strict';
const express = require('express');
const app = express();

const multer = require('multer');

// for application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); // built-in middleware
// for application/json
app.use(express.json()); // built-in middleware
// for multipart/form-data (required with FormData)
app.use(multer().none());

const DATA = {
  names: ['Sayu', 'Kevin', 'Chinari', 'Raika', 'Haruka', 'Risako'],
  count: 0,
};

/*
 * Defining a get endpoint.
 * Returns text type data. Takes a name randomely from data['names'], and
 * send it to cliant side.
 */
app.get('/choose', (req, res) => {
  // takes a random name from DATA
  let name = DATA['names'][randomIndex(DATA['names'])];
  res.type('text');
  res.send(name);
});

/*
 * Returns json type data. A new name will be sent to server side from form in
 * client side. Then, checks if the same name exists in the data in server side
 * and add a new one if it doesn't, show message if it exists. Increments the
 * count by one in case the new name is added, and sets results to 1, 0 otherwise.
 * Checks if newName is defined though it's set as required in HTML form, since
 * it's possible to make POST request not from the website itself.
 */
app.post('/add', (req, res) => {
  let newName = req.body.name;
  if (!newName) {
    // when has no value, err
    res.type('text');
    res.status(400).send('New name is not defined.');
  } else if (newName.length < 2) {
    res.type('text');
    res.status(400).send('Your name is too short. Please make it less simple!');
  } else {
    let ifUpdated = addIfNotExist(DATA['names'], newName);
    DATA['count'] += ifUpdated;
    DATA['result'] = ifUpdated;

    res.type('json');
    res.send(DATA);
  }
});

/**
 * Gets a random index from the given array and returns the index.
 * @param {Array} array Desired array.
 * @returns {int} returns a random index.
 */
function randomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

/**
 * Checks if a new element to be added already exists in the array, and adds
 * and returns 1 if it doesn't, returns 0 without adding otherwise.
 * it doesn't and
 * @param {Array} array The array that a new element might be added.
 * @param {string} element the new element to be added to the array.
 * @returns {int} returns 1 if the new element is added, 0 otherwise.
 */
function addIfNotExist(array, element) {
  let res = 0;
  if (!array.includes(element)) {
    array.push(element);
    res = 1;
  }
  return res;
}

app.use(express.static('public'));
const PORT = process.env.PORT || 8000;
app.listen(PORT);
