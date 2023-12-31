const models = require("../models");

const getUserByUsernameWithPasswordAndPassToNext = (req, res, next) => {
  models.viewer.findByUsernameWithHashedPassword(req.body).then(([rows]) => {
    const userInDatabase = rows[0];
    if (userInDatabase == null) {
      res.sendStatus(422);
    } else {
      req.viewer = {
        ...userInDatabase,
        isAdmin: userInDatabase.isAdmin,
      };
      next();
    }
  });
};

module.exports = {
  getUserByUsernameWithPasswordAndPassToNext,
};
