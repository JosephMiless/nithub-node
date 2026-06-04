const {
  findUserByEmail,
  signUpUser,
} = require("../repository/user.repository");
const { hashPassowrd } = require("../utils/bcrypt");

const signUpUserService = async (userData) => {
  try {
    // Check if user already exists
    const userExists = await findUserByEmail(userData.email);
    if (userExists) {
      throw new Error("User exists", 400);
    }

    // hash the password before saving to the database
    const hashedPassword = await hashPassowrd(userData.password);
    userData.password = hashedPassword;

    // Create new user
    return await signUpUser(userData);
  } catch (error) {
    throw error;
  }
};


module.exports = {
    signUpUserService,
}