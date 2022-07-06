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
    Creet.findAll({ 
        include: {
            model: User,
            attributes: ["username", "userId"],
        },
        order: [["createdAt", "DESC"]],
        }) 
        .then(creets => {            
            return res.status(200).send(creets.map(el => el.toJSON()));
        })
        .catch(err => {
            return res.status(500).send({ message: err.message });
        })
};
exports.deleteCreet = (req, res) => {
    // Check same author as creet & delete
    const reqUserId = req.userId;
    const creetId = req.params.id;
    Creet.destroy({
        where: {
            creetId: creetId,
            userId: reqUserId,
        }
    })
    .then(creet => {
        if (!creet) {
            return res.status(409).send({ message: 'Could not delete creet, maybe not existing or wrong userId' });
        }
        return res.status(200).send();
    })
    .catch(err => {
        return res.status(500).send({ message: err.message });
    });
};
exports.updateCreet = (req, res) => {
    // Check same author as creet & update content
    const reqUserId = req.userId;
    const creetId = req.params.id;
    Creet.update({ content: req.body.content }, {
            where: {
            creetId: creetId,
            userId: reqUserId,
        },
    })
        .then((creet) => {
            if (!creet) {
                return res.status(409).send({ message: 'Could not update creet, maybe not existing or wrong userId' });
            }
            return res.status(200).send()
        })
        .catch(err => {
            return res.status(500).send({ message: err.message });
        });
}