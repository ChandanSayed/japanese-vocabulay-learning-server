const authorizeAdmin = (req, res, next) => {
  if (req.user.userType !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins can only do this operation." });
  }
  next();
};

module.exports = { authorizeAdmin };