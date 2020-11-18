const express = require('express');
const router = express.Router();

const bouncer = require ("express-bouncer")(500, 900000);
const userCtrl = require('../controllers/user');

bouncer.blocked = function (req, res, next, remaining)
{
    res.send (429, "Too many requests have been made, " +
        "please wait " + remaining / 1000 + " seconds");
};

router.post('/signup', userCtrl.signup);
router.post('/login', bouncer.block, userCtrl.login);

module.exports = router;