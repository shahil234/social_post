const jwt = require("jsonwebtoken")

const generateAccessToken = (doc) => {
    const token = jwt.sign(doc, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1m"})
    return token;
}

module.exports = generateAccessToken