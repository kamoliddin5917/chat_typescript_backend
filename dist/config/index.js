"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.default = {
    PORT: process.env.PORT,
    JWT_KEY: process.env.JWT_KEY,
    DB_URL: process.env.DB_URL,
};
