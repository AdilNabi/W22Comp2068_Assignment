const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.render('family/khadija', {title: "Khadija", 
    body: 'Khadija is a home maker and loves to spend her time gardening, tending to a variety of different plants.'});

});

module.exports = router;