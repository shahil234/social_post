require("dotenv").config();
const connecDb = require("./database/db");
const express = require("express");

const authRoute = require("./routes/auth.route");
const postRoute = require("./routes/post.route")
const userRoute = require("./routes/user.route")
const accessTokenRoute = require("./routes/accessToken.route")


const app = express();
const port = process.env.PORT || 4001;

app.use(express.json());
app.use("/api/auth", authRoute)
app.use("/api/post",postRoute)
app.use("/api/accessToken", accessTokenRoute)
app.use("/api/user", userRoute)

connecDb()
.then(() => {
    app.listen(port, () => {
        console.log("App running on port", port);
    })
})