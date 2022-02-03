"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = __importDefault(require("../../utils/pg"));
var CREATED_USER = "\nINSERT INTO users (user_firstname, user_lastname, user_username, user_password) VALUES ($1, $2, $3, $4) RETURNING\n user_id AS id,\n user_firstname AS first_name,\n user_lastname AS last_name,\n user_username AS username,\n user_date AS date\n";
var createdUser = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return pg_1.default.pg(CREATED_USER, values);
};
exports.default = { createdUser: createdUser };
