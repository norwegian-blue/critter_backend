module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/auth/signup",
        [],
        (req, res) => { res.status(500).send({message: "signup to do"}) }
    );
    app.post(
        "/api/auth/signin",
        (req, res) => { res.status(500).send({message: "login to do"}) }
    );
};