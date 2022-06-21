const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
// Static files
const path = __dirname + '/app/views';
app.use(express.static(path));
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
// db
const db = require('./app/models');
db.sequelize.sync().then(() => {
    console.log('Resynch DB');
});
// Serve home page
app.get('/', (req, res) => {
    res.sendFile(path + "index.html");
});
// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})