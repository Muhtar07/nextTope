const bcrypt = require('bcrypt');

const { User } = require('../db/models');

module.exports = {
  async getUserData(userid) {
    const user = await User.findOne({ where: { id: userid } }).catch((e) => e);

    if (user instanceof Error) {
      throw user;
    }
    return user;
  },
  async createNewUser(name, email, password) {
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashPass });

    if (newUser instanceof Error) {
      throw newUser;
    }

    return newUser;
  },
};
