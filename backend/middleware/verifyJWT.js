const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized - no token" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err)
      return res.status(403).json({ message: "Forbidden - invalid token" });

    // Extract from nested UserInfo
    req.userId = decoded.UserInfo.userId;
    req.email = decoded.UserInfo.email;
    next();
  });
};

module.exports = verifyJWT;
