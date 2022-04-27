const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.render('family/ahmad', {title: "Ahmad", 
    body: "Ahmad is a UofT graduate and is currently working as an Engineer."});

});

module.exports = router;