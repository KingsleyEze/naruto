// Model for applications table
module.exports = (sequelize, DataTypes) => {
  const applications = sequelize.define(
    "applications",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      created_at: DataTypes.DATE,
      cover_letter: DataTypes.STRING
    },
    { underscored: true, timestamps: false }
  );
  applications.associate = function(models) {
    // associations can be defined here
    applications.belongsTo(models.users, {
      foreignKey: "user_id"
    });
    applications.belongsTo(models.listings, {
      foreignKey: "listing_id",
      as: "listing"
    });
  };
  return applications;
};
