require("dotenv").config();
const connecDb = require("./database/db");
const express = require("express");

const authRoute = require("./routes/auth.route");
const postRoute = require("./routes/post.route")
const accessTokenRoute = require("./routes/accessToken.route")

const authenticateUser = require("./middlewares/authentication")

const app = express();
const port = process.env.PORT || 4001;

app.use(express.json());
app.use("/api/auth", authRoute)
app.use("/api/post",authenticateUser,postRoute)
app.use("/api/accessToken", accessTokenRoute)

connecDb()
.then(() => {
    app.listen(port, () => {
        console.log("App running on port", port);
    })
})