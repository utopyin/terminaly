"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inputLine_1 = __importDefault(require("./inputLine"));
const ip_1 = __importDefault(require("./ip"));
exports.default = (setIP) => {
    inputLine_1.default();
    ip_1.default(setIP);
};
//# sourceMappingURL=index.js.map