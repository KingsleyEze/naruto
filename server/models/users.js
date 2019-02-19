"use strict";
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: DataTypes.STRING,
      created_at: DataTypes.DATE
    },
    { underscored: true, timestamps: false }
  );
  users.associate = function(models) {
    // associations can be defined here
    users.hasMany(models.applications, {
      foreignKey: "user_id"
    });
    users.hasMany(models.listings, {
      foreignKey: "created_by"
    });
    users.belongsToMany(models.companies, {
      as: "companies",
      through: "teams",
      foreignKey: "user_id",
      otherKey: "company_id"
    });
  };
  return users;
};
