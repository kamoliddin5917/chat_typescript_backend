"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = __importDefault(require("../../utils/pg"));
var FIND_USER = "\nSELECT\n    user_id AS id,\n    user_password AS password\n FROM users WHERE user_username = $1\n";
var findUser = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return pg_1.default.pg(FIND_USER, values);
};
exports.default = { findUser: findUser };
