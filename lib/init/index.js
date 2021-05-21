"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inputLine_1 = __importDefault(require("./inputLine"));
const ip_1 = __importDefault(require("./ip"));
const terminalClass_1 = require("../classes/terminalClass");
exports.default = (setIP, commands) => {
    ip_1.default(setIP);
    terminalClass_1.initCommandHandler(commands, inputLine_1.default);
};
//# sourceMappingURL=index.js.map