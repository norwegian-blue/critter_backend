const db = require("../models");
const Creet = db.creet; 
const User = db.user;
const pagination = require('./pagination.controller');

exports.postCreet = (req, res) => {
    // Save a new Creet to the Database
    Creet.create({
        content: req.body.content,
        userId: req.userId,
    })
        .then((creet) => {
            return res.status(200).send({ id: creet.id });
        })
        .catch(err => {
            return res.status(500).send({ message: err.message });
        });
};

exports.getAllCreets = (req, res) => {
    // Return the entire creets Database
    const { page, size } = req.query;
    const { limit, offset } = pagination.getPagination(page, size);
    Creet.findAndCountAll({ 
        offset: offset,
        limit: limit,
        attributes: ["id", "content", "createdAt", "userId"],
        include: [
        {
            // Include author info
            model: User,
            attributes: ["username", "id"],
        }, 
        {
            // Include re-creet info (and nested re-creet author)
            model: Creet,
            as: "reCreet",
            attributes: ["id", "content", "createdAt", "userId"],
            include: {
                model: User,
                attributes: ["username", "id"],
            }
        },
        {    
            // Include likes association
            association: "likes",
            attributes: ["id"],
        }], 
        order: [["createdAt", "DESC"]],
        }) 
        .then(data => {             
            const response = pagination.getPagingData(data, page, limit);
            return res.status(200).send(response);
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
            id: creetId,
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
            id: creetId,
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
};

exports.recreet = (req, res) => {
    // Check if not recreeting same author
    const reqUserId = req.userId;
    const reCreetId = req.params.id;
    Creet.findByPk(reCreetId)
        .then(creet => {
            if (!creet) {
                return res.status(409).send({ message: 'Could not find creet in database' });
            } else if (creet.userId === reqUserId) {
                return res.status(409).send({ message: 'Cannot re-creet self' });
            }
            // Add re-creet to database
            return Creet.create({
                content: req.body.content,
                userId: reqUserId,
                reCreetId: reCreetId,
            });
        })
        .then(creet => {
            console.log(creet);
            return res.status(200).send({ id: creet.id });
        })
        .catch(err => {
            return res.status(500).send({ message: err.message });
        });
};

exports.upvoteCreet = (req, res) => {
    const creetId = req.params.id;
    const reqUserId = req.userId;
    Creet.findByPk(creetId)
        .then(async creet => {
            await creet.addLikes(reqUserId);
            creet.countLikes()
            .then(numLikes => {
                return res.status(200).send({ likes: numLikes });
            })
        }) 
        .catch(err => {
            return res.status(500).send({ message: err.message });
        });
        
};