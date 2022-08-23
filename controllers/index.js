const express = require('express');
const router = express.Router();


router.get('/wellread', (req, res, next) => {
    res.render('index');
  });



module.exports = router;