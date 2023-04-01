var express = require('express');
var router = express.Router();
const Book = require('../models/books');
const sequenceGenerator = require('./sequenceGenerator');

//GET
router.get('/', (req, res, next) => {
    // call the Message model find() method to get all Books in the collection
    Book.find()
    .then(allBooks => {
        res.status(200).json({
            message: 'Book added successfully',
            data: allBooks
        })
    })
    .catch(error => {
       res.status(500).json({
          message: 'An error occurred',
          error: error
        });
    });
 });

//POST
router.post('/', (req, res, next) => {
                                            // Tem que ser books, no nosso sequence generator a gente fez o case para books no minusculo 
    const maxBookId = sequenceGenerator.nextId("books");

    // Colocar o body do mesmo interface 
    const book = new Book({
      id: maxBookId,
      title: req.body.title,
      author: req.body.author,
      yearPublished: req.body.yearPublished,
      description: req.body.description,
      imagePath: req.body.imagePath,
    });
  
    book.save()
      .then(createdBook => {
        res.status(201).json({
          message: 'Book added successfully',
          data: createdBook
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
  });

//PUT
router.put('/:id', (req, res, next) => {
    Book.findOne({ id: req.params.id })
      .then(book => {
        book.title = req.body.title
        book.author= req.body.author
        book.yearPublished= req.body.yearPublished
        book.description= req.body.description
        book.imagePath=req.body.imagePath
  
        Book.updateOne({ id: req.params.id }, book)
          .then(result => {
            res.status(204).json({
              message: 'Book updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Message not found.',
          error: { message: 'Message not found'}
        });
      });
  });

  //DELETE
  router.delete("/:id", (req, res, next) => {
    Book.findOne({ id: req.params.id })
      .then(book => {
        book.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Message deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Book not found.',
          error: { message: 'Book not found'}
        });
      });
  });
  
module.exports = router;