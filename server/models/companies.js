// Model for companies table
module.exports = (sequelize, DataTypes) => {
  const companies = sequelize.define(
    "companies",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      created_at: DataTypes.DATE,
      name: DataTypes.STRING
    },
    { underscored: true, timestamps: false }
  );
  companies.associate = function(models) {
    // associations can be defined here
    companies.belongsToMany(models.users, {
      as: "department",
      through: "teams",
      foreignKey: "company_id",
      otherKey: "user_id"
    });
  };
  return companies;
};
