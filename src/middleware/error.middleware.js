const e = require("express");


const errorMiddleware = (err, req, res, next) => {
    if (err instanceof e.Error) {
        return res.status(err.statusCode).json({ error: err.message });
    }

    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
};

module.exports = errorMiddleware;