"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var uuid_1 = require("uuid");
exports.default = {
    fileUpload: function (file) {
        var fileName = "__".concat(file.mimetype.split("/")[0], "__").concat((0, uuid_1.v4)(), ".").concat(file.mimetype.split("/")[1]);
        file.mv(path_1.default.join(__dirname, "../uploads", fileName));
        return fileName;
    },
    fileDelete: function (file) {
        fs_1.default.unlink(path_1.default.join(__dirname, "../uploads", file), function (er) {
            console.log(er);
        });
    },
};
