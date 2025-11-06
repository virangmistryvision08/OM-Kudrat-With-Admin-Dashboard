const jwt = require("jsonwebtoken");

// Pass allowed roles as an array, e.g., ["Admin"]
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

      // Attach user to request
      req.user = user;

      // If roles are specified, check if user role is allowed
      if (rolesAllowed.length && !rolesAllowed.includes(user.role)) {
        return res.status(403).json({ message: "UnAuthorize User!" });
      }

      next();
    });
  };
};

module.exports = authToken;
