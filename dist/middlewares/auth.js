"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwt_1 = __importDefault(require("../utils/jwt"));
exports.default = {
    AUTH_USER: function (req, res, next) {
        try {
            var token = req.headers.token;
            var userId = jwt_1.default.verify(token).userId;
            if (!userId)
                return res
                    .status(401)
                    .json({ message: "Login qilin yoki Registratsiyadan o'tin!" });
            req.body.userId = userId;
            next();
        }
        catch (error) {
            return res
                .status(401)
                .json({ message: "Login qilin yoki Registratsiyadan o'tin!" });
        }
    },
};
