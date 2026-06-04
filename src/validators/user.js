const joi = require('joi');;

const signUpUserSchema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required().min(6)
});

const loginUserSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(6)
});

module.exports = {
    signUpUserSchema,
    loginUserSchema,
}