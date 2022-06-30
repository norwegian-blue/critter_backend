const db = require("../models");
const Creet = db.creet; 
exports.post = (req, res) => {
    // Save a new Creet to the Database
    Creet.create({
        content: req.body.content,
        userId: req.userId,
    })
        .then(() => {
            return res.status(200).send();
        })
        .catch(err => {
            return res.status(500).send({ message: err.message });
        });
};