const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
// CORS
if (process.env.NODE_ENV === "development") {
    var corsOptions = {
        origin:  "http://localhost:8081",
    };
    app.use(cors(corsOptions));
}
// parse request of content-type - application/json
app.use(bodyParser.json());
// parse request of content-type - application/x-www-form-url-encoded
app.use(bodyParser.urlencoded({ extended: true }));
// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/creet.routes')(app);
// db
const db = require('./app/models');
db.sequelize.sync({
    force: process.env.NODE_ENV === "development" ? true : false
})
.then(() => {
    console.log('Resynch DB');
});
// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})