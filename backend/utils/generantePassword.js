const bcrypt = require("bcrypt");

const generatePassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

module.exports = generatePassword;
