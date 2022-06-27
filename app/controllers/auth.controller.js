const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
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
exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User not found!" });
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid password!"
                });
            }
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });
            res.status(200).send({
                id: user.id,
                username: user.username,
                accessToken: token
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
exports.delete = (req, res) => {
    // Delete the user from the Database
    const id = req.params.id;
    User.destroy({
        where: {id: id}
    })
        .then(user => {
            if(user) {
                return res.send({
                    message: `User ${id} was successfully deleted`
                });
            } else {
                return res.status(409).send({
                    message: `Could not delete User with id=${id}. Maybe user does not exist`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `attempting to delete user ${req.params.id}`
            });
        });
};
exports.update = (req, res) => {
    res.status(501).send({ message: "not implemented" })
};