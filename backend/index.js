require("dotenv").config();
const connecDb = require("./database/db");
const express = require("express");

const app = express();
const port = process.env.PORT || 4001;

connecDb()
.then(() => {
    app.listen(port, () => {
        console.log("App running on port", port);
    })
})