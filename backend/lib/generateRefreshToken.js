const jwt = require("jsonwebtoken")

const generateRefreshToken = (doc) => {
    const token = jwt.sign(doc, process.env.REFRESH_TOKEN_SECRET , {expiresIn: "30d"})
    return token;
}

module.exports = generateRefreshToken