const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({
      message: "invalid token",
    });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if(err) return res.status(403).json({message: "Unauthorized user"});

    req.user = user;
    next();
  });
};

module.exports = authentication;
