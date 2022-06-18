const db = require("../models");
const bcrypt = require("bcryptjs");
const User = db.user;
exports.signup = (req, res) => {
    // Save User to Database
    User.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(user => {
            res.send({ message: "User was created successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};