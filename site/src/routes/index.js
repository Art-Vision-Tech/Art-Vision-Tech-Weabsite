var express = require("express");
var router = express.Router();

router.get("/calculadora", function (req, res) {
    res.render("calculadora");
});

module.exports = router;