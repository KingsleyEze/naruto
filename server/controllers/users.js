const users = require("../models").users;
const applications = require("../models").applications;
const listings = require("../models").listings;
const companies = require("../models").companies;
const teams = require("../models").teams;
const sequelize = require("sequelize");

module.exports = {
  // Get's all users details
  list(req, res) {
    console.log(req.query.page);
    return users
      .findAll({
        attributes: [
          "id",
          "created_at",
          "name",
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM applications WHERE applications.user_id = users.id)"
            ),
            "count"
          ]
        ],
        include: [{ model: listings, attributes: ["name"] }],
        order: [[{ model: listings, as: "listings" }, "created_at", "DESC"]],
        limit: 3,
        offset: req.query.page ? req.query.page : 0
      })
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send(error));
  },

  // Get's a single user details
  retrieve(req, res) {
    return users
      .findByPk(req.query.id, {
        attributes: ["id", "created_at", "name"],
        include: [
          {
            model: companies,
            as: "companies",
            attributes: ["id", "created_at", "name"],
            through: {
              attributes: ["contact_user"]
            }
          },
          { model: listings },
          {
            model: applications,
            attributes: ["id", "created_at", "cover_letter"],
            include: [{ model: listings, as: "listing" }]
          }
        ]
      })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: "User Not Found"
          });
        }
        return res.status(200).send(user);
      })
      .catch(error => res.status(400).send(error));
  }
};
