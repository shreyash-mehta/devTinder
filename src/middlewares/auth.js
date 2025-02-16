const adminAuth = (req, res, next) => {
  console.log("admin is being authenticated");
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(402).send("Unauthorized User");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
    console.log("user is being authenticated");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if (!isAdminAuthorized) {
      res.status(402).send("Unauthorized Userrr");
    } else {
      next();
    }
  };

module.exports = { adminAuth, userAuth };
