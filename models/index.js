const Fundraiser = require("./Fundraiser");
const Category = require("./Category");

// A fundraiser belongs to a category
Fundraiser.belongsTo(Category, { foreignKey: "CATEGORY_ID" });

// A category has many fundraisers
Category.hasMany(Fundraiser, { foreignKey: "CATEGORY_ID" });

module.exports = {
  Fundraiser,
  Category,
};
