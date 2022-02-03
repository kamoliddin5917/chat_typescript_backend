"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = __importDefault(require("../../utils/pg"));
var FIND_MESSAGES = "\nSELECT\n    message_id AS id,\n    message_text AS message,\n    message_media AS file,\n    message_user AS user_id,\n    message_author AS author_id,\n    message_date AS date\nFROM messages WHERE message_author = $1 OR message_user = $1\n";
var CREATE_MESSAGE = "\nINSERT INTO messages (message_text, message_media, message_user, message_author) VALUES ($1, $2, $3, $4) RETURNING\nmessage_id AS id,\nmessage_text AS message,\nmessage_media AS file,\nmessage_user AS user_id,\nmessage_author AS author_id,\nmessage_date AS date\n";
var DELETE_MESSAGE = "\nDELETE FROM messages WHERE message_id = $1 AND message_author = $2 RETURNING\nmessage_id AS id,\nmessage_media AS file,\nmessage_user AS user_id\n";
var findMessages = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return pg_1.default.pgAll(FIND_MESSAGES, values);
};
var createMessage = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return pg_1.default.pg(CREATE_MESSAGE, values);
};
var deleteMessage = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return pg_1.default.pg(DELETE_MESSAGE, values);
};
exports.default = { findMessages: findMessages, createMessage: createMessage, deleteMessage: deleteMessage };
