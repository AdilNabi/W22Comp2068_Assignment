// Requirements are declared here including multer which is used for parsing the image file.
const express = require('express');
const multer = require('multer');
const router = express.Router();

var fs = require('fs');
var path = require('path');

const Book = require('../models/book');

//This function is used to check if user is logged in before they can access CRUD pages
function IsLoggedIn(req,res,next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// This GET returns a list of books in a table on the index page
router.get('/', (req, res, next) => {
    Book.find((err, books)=> {
        if (err){
        console.log(err);
        }
        else {
            res.render('books/index', {title: "Book List", dataset: books, user: req.user});
        }
    })
});

// This GET ADD takes users to the add page while being checked for authentication first
router.get('/add', IsLoggedIn, (req, res, next) => {
	res.render('books/add', {title: "Enter The Book information Below",  user: req.user});
});

// This is where multer package is used. Here the image file which is uploaded
// is stored in the public/images folder and is given a new file name.
// That file name is referenced and stored in the book object so that 
// the image can be shown when the book is displayed.
var Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
});
var upload = multer({ 
    storage: Storage,
}).single("image");


// This POST is where the book is created and stored in the database
router.post("/add", IsLoggedIn, (req, res) => {
    upload(req, res, function (err) {
      if (err) {
        console.log(err);
        return res.end("Something went wrong");
      } else {
        console.log(req.file.path);
        var imageName = req.file.filename;
        Book.create({
            		title: req.body.title,
            		author: req.body.author,
            		genre: req.body.genre,
            		image: imageName,
            	});
                res.redirect('/books');
      }
    });
  });

// This is the GET EDIT where information of the selected book is chosen,
// And is taken to the edit page.
  router.get('/edit/:_id', IsLoggedIn, (req, res, next) => {
    Book.findById(req.params._id, (err, book) => {
        if (err) {
            console.log(err);
        }
        else {
                res.render('books/edit', {
                    title: 'Edit a Book',
                    user: req.user,
                    book: book
                    });
            }
            }).sort({ name: 1 });
});


// this is POST EDIT where the edits are saved into the objects and stored into the database.
router.post('/edit/:_id', IsLoggedIn, (req,res,next) => {
    Book.findOneAndUpdate({_id: req.params._id}, {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
    }, (err, updatedBook) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/books');
        }
    });
});

// this is DELETE where the selected object is deleted from the database.
router.get('/delete/:_id', IsLoggedIn, (req, res, next) => {
      Book.remove({
        _id : req.params._id
      }, (err) => {
          if(err) {
              console.log(err);
          }
          else {
              res.redirect('/books');
          }
      });
  });


module.exports = router;
