"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = __importDefault(require("./model"));
var jwt_1 = __importDefault(require("../../utils/jwt"));
var bcrypt_1 = __importDefault(require("../../utils/bcrypt"));
var event_1 = __importDefault(require("../../event/event"));
exports.default = {
    ee: event_1.default,
    POST: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, firstName, lastName, username, password, hashedPassword, createUser, token, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, firstName = _a.firstName, lastName = _a.lastName, username = _a.username, password = _a.password;
                    if (!firstName || !lastName || !username || !password)
                        return [2 /*return*/, res.status(400).json({ message: "BAD_REQUEST!" })];
                    return [4 /*yield*/, bcrypt_1.default.hashPassword(password)];
                case 1:
                    hashedPassword = _b.sent();
                    return [4 /*yield*/, model_1.default.createdUser(firstName, lastName, username, hashedPassword)];
                case 2:
                    createUser = _b.sent();
                    if (!createUser)
                        return [2 /*return*/, res.status(500).json({ message: "SERVER_ERROR_NOT_CREATED!" })];
                    token = jwt_1.default.sign({ userId: createUser.id });
                    res.status(201).json({ message: "CREATED!", token: token });
                    event_1.default.emit("CREATED_USER", createUser);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    res.status(400).json({
                        message: "This username (".concat(req.body.username, ") already exist!"),
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); },
};
