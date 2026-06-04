const { signUpUserService } = require("../services/user.services");
const { signUpUserSchema } = require("../validators/user");

const signUpUserController = async (req, res, next) => {
  try {
    const { error, value } = signUpUserSchema.validate(req.body);

    if (error) return res.status(400).json({ error: error.message });

    const newUser = await signUpUserService(value);
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    next(error);
  }
};

module.exports = {
    signUpUserController,
};