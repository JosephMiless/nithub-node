const dotenv = require("dotenv");
dotenv.config();


const config = {
    PORT: process.env.PORT,
    db: {
        name: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_HOST,
        dialect: process.env.DATABASE_DIALECT,
        port: process.env.DATABASE_PORT,
    }
};

module.exports = config;