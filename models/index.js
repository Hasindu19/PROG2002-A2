const Fundraiser = require("./Fundraiser");
const Category = require("./Category");

// A fundraiser belongs to a category
Fundraiser.belongsTo(Category, { foreignKey: "categoryId" });

// A category has many fundraisers
Category.hasMany(Fundraiser, { foreignKey: "categoryId" });

module.exports = {
  Fundraiser,
  Category,
};
