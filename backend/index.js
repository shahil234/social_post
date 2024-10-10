require("dotenv").config();
const connecDb = require("./database/db");
const express = require("express");

const authRoute = require("./routes/auth.route");

const app = express();
const port = process.env.PORT || 4001;

app.use(express.json());
app.use("/api/auth", authRoute)

connecDb()
.then(() => {
    app.listen(port, () => {
        console.log("App running on port", port);
    })
})