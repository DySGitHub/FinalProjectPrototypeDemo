var express = require('express');
var cool = require('cool-ascii-faces');


var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: "myAuto"
    });
    res.render('index', {
        title: "myAuto"
    });
});

module.exports = router;
