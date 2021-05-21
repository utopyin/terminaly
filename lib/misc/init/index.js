"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inputLine_1 = __importDefault(require("./inputLine"));
const ip_1 = __importDefault(require("./ip"));
const commandHandler_1 = __importDefault(require("./commandHandler"));
exports.default = (setIP, keywords, id, natives, commandHandler, commands) => {
    ip_1.default(setIP);
    commandHandler_1.default(natives, commandHandler, commands, keywords);
    inputLine_1.default(keywords, id);
};
//# sourceMappingURL=index.js.map