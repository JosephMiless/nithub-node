const bcrypt = require ("bcrypt");

const hashPassowrd = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

module.exports = { hashPassowrd };