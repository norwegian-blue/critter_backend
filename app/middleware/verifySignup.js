const { verify } = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
const checkDuplicateUsername = (req, res, next) => {
    // Username
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Username is already in use!"
            });
            return;
        }
        next();
    });
};
const verifyAdmin = (req, res, next) => {
    // Check user has admin role
    User.findByPk(req.userId)
    .then(user => {
        if (user.role !== "ADMIN") {
            return res.status(401).send({ message: "Admin rights required for the operation!" });
        }
        next();
    })
    .catch(err => {
        return res.status(500).send({ message: `Server error: ${err.message}`});
    });
};
const verifySameId = (req, res, next) => {
    if (!req.userId || !req.params.id) {
        return res.status(403).send({
            message: "No user ID provided"
        });
    } else if (req.userId != req.params.id) {
        return res.status(403).send({
            message: "Request ID does not match user ID"
        });
    }
    next();
};
const verifySignup = {
    checkDuplicateUsername: checkDuplicateUsername,
    verifyAdmin: verifyAdmin,
    verifySameId: verifySameId,
};

module.exports = verifySignup;