"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = __importDefault(require("../../utils/pg"));
var FIND_USERS = "\nSELECT\n    user_id AS id,\n    user_firstname AS first_name,\n    user_lastname AS last_name,\n    user_username AS username,\n    user_date AS date\n FROM users \n";
var findUsers = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return pg_1.default.pgAll(FIND_USERS, values);
};
exports.default = { findUsers: findUsers };
