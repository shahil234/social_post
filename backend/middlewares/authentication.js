const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({
      message: "invalid token",
    });

  const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRETf);
  console.log(payload)
  next();
};

module.exports = authentication;
