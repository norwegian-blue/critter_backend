const { verify } = require("jsonwebtoken");
const { user } = require("../models");
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
        return res.status(500).send({ message: `Server error: ${err.message}` });
    });
};
const verifySameId = (req, res, next) => {
    // Check IDs are provided
    if (!req.userId || !req.params.id) {
        return res.status(403).send({
            message: "No user ID provided"
        });
    }

    // Return on ID mismatch
    if (req.userId != req.params.id) {
        // Check if ADMIN
        User.findByPk(req.userId)
        .then(user => {
            if (user.role !== 'ADMIN') {
                return res.status(403).send({ message: "Request ID does not match user ID" });
            }
            next();
        })
        .catch(err => {
            return res.status(500).send({ message: `Server error: ${err.message}` });
        });
    } else {
        next();
    }
};
const verifyPermission = (req, res, next) => {
    User.findByPk(req.userId)
    .then((user) => {
        if (user.role === 'PENDING') {
            return res.status(403).send({ message: `User -${user.username}- is pending approval, please contact the admin!` });
        }
        next();
    })
    .catch(err => {
        return res.status(500).send({ message: `Server error: ${err.message}` });
    });
};

const verifySignup = {
    checkDuplicateUsername: checkDuplicateUsername,
    verifyAdmin: verifyAdmin,
    verifySameId: verifySameId,
    verifyPermission: verifyPermission,
};

module.exports = verifySignup;