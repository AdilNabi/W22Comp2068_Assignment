const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.render('family/adil', {title: "Adil", 
    body: "Adil is currently a second year Computer Science Student at Lakehead-Georgian."});

});

module.exports = router;