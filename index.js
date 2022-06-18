const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var corsOptions = {
    origin:  "http://localhost:8081",
};
app.use(cors(corsOptions));
// parse request of content-type - application/json
app.use(bodyParser.json());
// parse request of content-type - application/x-www-form-url-encoded
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})