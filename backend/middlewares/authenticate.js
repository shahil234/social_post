const jwt = require("jsonwebtoken")

const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) return res.status(401).json({
        message: "invalid token"
    })

    await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403)

        req.user = user;
        console.log(user)
        next()
    })

}


module.exports = authenticateUser