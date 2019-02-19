"use strict";
module.exports = (sequelize, DataTypes) => {
  const listings = sequelize.define(
    "listings",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: DataTypes.STRING,
      description: DataTypes.STRING
    },
    { underscored: true, timestamps: false }
  );
  listings.associate = function(models) {
    // associations can be defined here
    // listings.hasMany(models.applications, {
    //   foreignKey: "listing_id"
    // });
  };
  return listings;
};
