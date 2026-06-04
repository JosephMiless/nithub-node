const {User} = require("../models");

const findUserByEmail = async (email) => {
    return await User.findOne({ where: { email } });
};

const findUserById = async (id) => {
    return await User.findOne({ where: { id } });
};

const signUpUser = async (user) => {
    return await User.create(user);
};

const updateUser = async (id, updatedFields) => {
    return await User.update(updatedFields, { where: { id } });
};

const deleteUser = async (id) => {
    return await User.destroy({ where: { id } });
};

module.exports = { 
    findUserByEmail,
    findUserById,
    signUpUser,
    updateUser,
    deleteUser,
};