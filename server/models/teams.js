"use strict";
module.exports = (sequelize, DataTypes) => {
  const teams = sequelize.define(
    "teams",
    {
      contact_user: { type: DataTypes.BOOLEAN }
    },
    { underscored: true, timestamps: false }
  );
  teams.associate = function(models) {
    // associations can be defined here
  };
  return teams;
};
