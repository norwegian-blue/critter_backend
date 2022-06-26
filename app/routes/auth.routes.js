const { verifySignup } = require("../middleware");
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
        (req, res) => {res.status(500).send({ message: `attempting to delete user ${req.params.id}`})}
    );
    app.put(
        "/api/auth/user",
        (req, res) => {res.status(500).send({ message: "not implemented" })}
    );
};