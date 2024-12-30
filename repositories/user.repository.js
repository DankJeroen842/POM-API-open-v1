const { where } = require("sequelize");
const { Op } = require("sequelize");

const User = require("../models/user");

const registerUser = async (userData) => {
  return await User.create(userData);
};

const updateUser = async (id, userData) => {
  return await User.update(userData, { where: { id: id } });
};

const findUserByEmail = async (email) => {
    return await User.findOne({where: {email: email}})
}

const findUserByToken = async (token) => {
    console.log(token)
    return await User.findOne({where: {tokens: {[Op.contains]: [token]}}})
}

module.exports = {
    registerUser,
    findUserByEmail,
    findUserByToken,
    updateUser
};
