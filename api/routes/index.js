var express = require('express');
var app = express.Router();
app.use(express.json());
const Book = require('../book');



const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', e));


/* GET home page. */
app.get('/', (req, res, next) => {
  res.send('Oláaa');
  next();
});

module.exports = app;


// ... previous code ...

// Create a Book
app.post('/books', async (req, res) => {
  // Logic to add a book
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).send('Missing title or author');
  }

  let book = new Book({ title: req.body.title, author: req.body.author });
  book = await book.save();
  res.send(book);
});

// Get All Books
app.get('/books', async (req, res) => {
  const books = await Book.find();
  res.send(books);
});

// Get a Single Book
app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id); 
    if (!book) {
      return res.status(404).send('Book not found');
    }
    res.send(book);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Update a Book
app.put('/books/:id', async (req, res) => {
  // Logic to update a book
  try{
    const book = await Book.findByIdAndUpdate(req.params.id, { title: req.body.title, author: req.body.author }, { new: true });
    if (!book) return res.status(404).send('Book not found');
    res.send(book);
  } catch (error){
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Delete a Book
app.delete('/books/:id', async (req, res) => {
  // Logic to delete a book
  const book = await Book.findByIdAndRemove(req.params.id);
  if (!book) return res.status(404).send('Book not found');
  res.status(204).send();
});

// ... previous code ...


module.exports = app;