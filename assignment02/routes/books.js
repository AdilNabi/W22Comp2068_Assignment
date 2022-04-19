const express = require('express');
const multer = require('multer');
const router = express.Router();

var fs = require('fs');
var path = require('path');

const Book = require('../models/book');
const { dirname } = require('path');

router.get('/', (req, res, next) => {
	res.render('books/index', {title: "Welcome to Book List"});
});


router.get('/add', (req, res, next) => {
	res.render('books/add', {title: "Enter The Book information Below"});
});


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage });



router.post('/add', upload.single('image'), (req, res, next) => {
	Book.create({
		title: req.body.title,
		author: req.body.author,
		genre: req.body.genre,
		image: {
			data: fs.readFileSync(path.join( __dirname + '/uploads/' + req.file.filename)),
			contentType: 'image/png'
		}
	}, (err, newBook) => {
		if(err) {
			console.log(err);
		}
		else {
			res.redirect('/books');
		}
	});
});


module.exports = router;
