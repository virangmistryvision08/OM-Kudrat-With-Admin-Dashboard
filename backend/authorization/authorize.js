const jwt = require("jsonwebtoken");

const authToken = (rolesAllowed = []) => {
  return (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ status: false, message: "Unauthor User!" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "UnAuthorize User!" });
      }
      req.user = user;

      if (rolesAllowed.length && !rolesAllowed.includes(user.role)) {
        return res.status(403).json({ message: "UnAuthorize User!" });
      }

      next();
    });
  };
};

module.exports = authToken;
