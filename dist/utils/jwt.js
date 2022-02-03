"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var config_1 = __importDefault(require("../config"));
exports.default = {
    sign: function (data) { return (0, jsonwebtoken_1.sign)(data, config_1.default.JWT_KEY); },
    verify: function (data) { return (0, jsonwebtoken_1.verify)(data, config_1.default.JWT_KEY); },
};
