const db = require("../models");
const Creet = db.creet; 
const User = db.user;
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
    Creet.findAll({ include: {
        model: User,
        attributes: ["username", "userId"],
        }}) 
        .then(creets => {            
            return res.status(200).send(creets.map(el => el.toJSON()));
        })
        .catch(err => {
            return res.status(500).send({ message: err.message });
        })
}