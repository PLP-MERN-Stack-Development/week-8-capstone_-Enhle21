module.exports = (req, res, next) => {
  // Simulate a user auth check
  req.user = { id: "dummyUserId123" };
  next();
};