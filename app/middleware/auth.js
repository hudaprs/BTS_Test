const jwt = require("jsonwebtoken");
const config = require("config");

exports.auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  try {
    if (!token) return res.status(404).json({ msg: "No token found" });

    const decoded = jwt.verify(token, config.get("jwtSecret"));
    if (!decoded) return res.status(400).json({ msg: "Token expired" });

    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Token invalid" });
  }
};
