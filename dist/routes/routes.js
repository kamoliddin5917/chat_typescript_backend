"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
var route_1 = __importDefault(require("../modules/register/route"));
var route_2 = __importDefault(require("../modules/login/route"));
var route_3 = __importDefault(require("../modules/message/route"));
var route_4 = __importDefault(require("../modules/user/route"));
router.use("/auth", route_1.default);
router.use("/auth", route_2.default);
router.use("/api", route_3.default);
router.use("/api", route_4.default);
exports.default = router;
