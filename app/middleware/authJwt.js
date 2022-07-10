const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};
verifyId = (req, res, next) => {
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
}
const authJwt = {
    verifyToken: verifyToken,
    verifyId: verifyId,
};
module.exports = authJwt;