const { verifySignup, authJwt } = require("../middleware");
const controller = require('../controllers/auth.controller.js');
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/auth/user",
        [
            verifySignup.checkDuplicateUsername
        ],
        controller.signup
    );
    app.post(
        "/api/auth/signin",
        controller.signin
    );
    app.delete(
        "/api/auth/user/:id",
        [
            authJwt.verifyToken,
            verifySignup.verifySameId,
        ],
        controller.delete
    );
    app.put(
        "/api/auth/user/:id",
        [
            authJwt.verifyToken,
            verifySignup.verifySameId,
        ],
        controller.update
    );
    app.get(
        "/api/auth/user",
        [
            authJwt.verifyToken,
            verifySignup.verifyAdmin,
        ],
        controller.getUsers
    );
    app.post(
        "/api/auth/approve/:id",
        [
            authJwt.verifyToken,
            verifySignup.verifyAdmin,
        ],
        controller.approve
    );
};