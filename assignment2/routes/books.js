const express = require('express');
const multer = require('multer');
const router = express.Router();

var fs = require('fs');
var path = require('path');

const Book = require('../models/book');
const { dirname } = require('path');

router.get('/', (req, res, next) => {
	// res.render('books/index', {title: "Welcome to Book List"});
    Book.find((err, books)=> {
        if (err){
        console.log(err);
        }
        else {
            res.render('books/index', {title: "Book List", dataset: books });
        }
    })
});


router.get('/add', (req, res, next) => {
	res.render('books/add', {title: "Enter The Book information Below"});
});


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



// router.post('/add', (req, res, next) => {
// 	Book.create({
// 		title: req.body.title,
// 		author: req.body.author,
// 		genre: req.body.genre,
// 		image: req.file.filename
// 	}, (err, newBook) => {
// 		if(err) {
// 			console.log(err);
// 		}
// 		else {
// 			res.redirect('/books');
// 		}
// 	});
// });

router.post("/add", (req, res) => {
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


module.exports = router;
