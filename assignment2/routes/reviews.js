// Imports
const express = require('express');
const router = express.Router();

const Review = require('../models/review');
const Book = require('../models/book');

// Function to check if user is logged in
function IsLoggedIn(req,res,next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// GET for index, populates index with list of reviews
router.get('/', (req, res, next) => {
    Review.find((err, reviews)=> {
        if (err){
        console.log(err);
        }
        else {
            res.render('reviews/index', {title: "Review List", dataset: reviews,  user: req.user });
        }
    })
});

// GET for Add, requires authentication
router.get('/add', IsLoggedIn, (req,res,next) => {
    Book.find((err, books)=> {
       if(err) {
        console.log(err);
       }
        else {
        res.render('reviews/add', {title: "Add a Review List", books : books,  user: req.user }); 
        }
    });
});

// POST for Add, requires authentication
router.post('/add', IsLoggedIn, (req,res,next) => {
    Review.create({
        title: req.body.title,
        reviewer: req.body.reviewer,
        book: req.body.book,
        body: req.body.body
    },(err, newReview) => {
        if(err) {
            console.log(err)
        }
        else {
            res.redirect('/reviews');
        }
    })
});

// GET for Edit
router.get('/edit/:_id', IsLoggedIn, (req, res, next) => {
    Review.findById(req.params._id, (err, review) => {
        if (err) {
            console.log(err);
        }
        else {
            Book.find((err, books) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.render('reviews/edit', {
                        title: 'Edit a Review',
                        user: req.user,
                        review: review,
                        books: books
                    });
                }
            }).sort({ name: 1 });
        }
    });
});

// POST for Edit
router.post('/edit/:_id', IsLoggedIn, (req,res,next) => {

    Review.findOneAndUpdate({_id: req.params._id}, {
        title: req.body.title,
        reviewer: req.body.reviewer,
        book: req.body.book,
        body: req.body.body
    }, (err, updatedBook) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/reviews');
        }
    });
});

// DELETE for selected object
router.get('/delete/:_id', IsLoggedIn, (req, res, next) => {
    Review.remove({
      _id : req.params._id
    }, (err) => {
        if(err) {
            console.log(err);
        }
        else {
            res.redirect('/reviews');
        }
    });
});

module.exports = router;