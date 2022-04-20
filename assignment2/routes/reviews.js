const express = require('express');
const router = express.Router();


const Review = require('../models/review');
const Book = require('../models/book');

router.get('/', (req, res, next) => {
    Review.find((err, reviews)=> {
        if (err){
        console.log(err);
        }
        else {
            res.render('reviews/index', {title: "Review List", dataset: reviews });
        }
    })
});

router.get('/add', (req,res,next) => {
    Book.find((err, books)=> {
       if(err) {
        console.log(err);
       }
        else {
        res.render('reviews/add', {title: "Add a Review List", books : books }); 
        }
    });
});

router.post('/add', (req,res,next) => {
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

module.exports = router;