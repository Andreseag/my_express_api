const { User, UserSchema } = require('./user.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));

  // Add other models initialization here if needed
}

module.exports = setupModels;
