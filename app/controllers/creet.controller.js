const db = require("../models");
const Creet = db.creet; 
exports.postCreet = (req, res) => {
    // Save a new Creet to the Database
    Creet.create({
        content: req.body.content,
        userId: req.userId,
    })
        .then((creet) => {
            return res.status(200).send({ id: creet.creetId });
        })
        .catch(err => {
            return res.status(500).send({ message: err.message });
        });
};
exports.getAllCreets = (req, res) => {
    // Return the entire creets Database
    Creet.findAll()
        .then(creets => {
            return res.status(200).send(creets)
        })
        .catch(err => {
            return res.status(500).send({ message: err.message });
        })
}