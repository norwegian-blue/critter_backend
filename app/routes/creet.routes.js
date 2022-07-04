const { authJwt } = require("../middleware");
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
        ],
        controller.postCreet
    );
    app.get(
        "/api/creets",
        [
            authJwt.verifyToken,
        ],
        controller.getAllCreets
    );
    app.delete(
        "/api/creets/:id",
        [
            authJwt.verifyToken,
        ],
        controller.deleteCreet
    )
};