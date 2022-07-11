const { authJwt, verifySignup } = require("../middleware");
const controller = require("../controllers/creet.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/creets",
        [
            authJwt.verifyToken,
            verifySignup.verifyPermission,
        ],
        controller.postCreet
    );
    app.get(
        "/api/creets",
        [
            authJwt.verifyToken,
            verifySignup.verifyPermission,
        ],
        controller.getAllCreets
    );
    app.delete(
        "/api/creets/:id",
        [
            authJwt.verifyToken,
            verifySignup.verifyPermission,
        ],
        controller.deleteCreet
    );
    app.put(
        "/api/creets/:id",
        [
            authJwt.verifyToken,
            verifySignup.verifyPermission,
        ],
        controller.updateCreet
    );
    app.post(
        "/api/creets/recreet/:id",
        [
            authJwt.verifyToken,
            verifySignup.verifyPermission,
        ],
        controller.recreet

    );
    app.post(
        "/api/creets/upvote/:id",
        [
            authJwt.verifyToken,
            verifySignup.verifyPermission,
        ],
        controller.upvoteCreet
    )
};