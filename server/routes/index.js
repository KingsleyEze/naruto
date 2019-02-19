const usersController = require("../controllers").users;

module.exports = app => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to the Uers API!"
    })
  );

  app.get("/api/topActiveUsers", usersController.list);
  app.get("/api/users", usersController.retrieve);
};
