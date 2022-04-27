const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.render('family/amjad', {title: "Amjad", 
    body: "Amjad is a Professor who teaches at a University. He also works as a consultant Engineer."});

});

module.exports = router;