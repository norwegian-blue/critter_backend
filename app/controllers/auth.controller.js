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
        .then(() => {
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
    const userId = req.params.id;
    User.destroy({
        where: {id: userId}
    })
        .then(user => {
            if(user) {
                return res.send({
                    message: `User ${userId} was successfully deleted`
                });
            } else {
                return res.status(409).send({
                    message: `Could not delete User with id=${userId}. Maybe user does not exist`
                });
            }
        })
        .catch(err => {
            return res.status(500).send({
                message: `Server side error, coudl not to delete user ${userId}. ${err.message}`
            });
        });
};
exports.update = (req, res) => {
    // Update user information
    const userId = req.userId;
    User.findOne({
        where: {username: req.body.username}
    })
        .then(user => {
            if (!user || (user && user.id === userId)) {
                // New username (no dubplicate) or password update of current user
                User.update({
                    username: req.body.username,
                    password: bcrypt.hashSync(req.body.password, 8),
                }, {
                    where: {id: userId}
                })
                    .then(() => {
                        return res.status(200).send({
                            id: userId,
                            username: req.body.username
                        });
                    })
                    .catch(err => {
                        return res.status(500).send({ message: `Unexpected server error: user update! ${err.message}` });
                    });
            } else {
                // Duplicate username
                return res.status(400).send({
                    message: `Username -${user.username}- is already taken!`
                });
            }
        })
        .catch(err => {
            return res.status(500).send({
                message: `Server side error, could not to delete user ${userId}! ${err.message}`
            })
        });
};
exports.getUsers = (req, res) => {
    User.findAll({
        attributes: ["username", "id", "role"],
        order: [["username", "ASC"]],
    })
    .then(data => {
        return res.status(200).send(data.map(el => el.toJSON()));
    })
    .catch(err => {
        return res.status(500).send({
            message: `Server side error: ${err.message}`
        })
    })
};
exports.approve = (req, res) => {
    User.findByPk(req.params.id)
    .then(async user => {
        if (user.status === 'ADMIN') {
            return res.status(409).send({ message: "cannot approve ADMIN" });
        }
        await user.update({
            role: "USER",
        });
        return res.status(200).send({ message: "successfully approved" });
    })
    .catch(err => {
        return res.status(500).send({
            message: `Server side error: ${err.message}`
        })
    });
}