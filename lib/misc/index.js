"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInput = exports.handleKeyDown = exports.handleCommand = exports.nativeFunctions = exports.nativeCommands = exports.init = void 0;
const init_1 = __importDefault(require("./init"));
exports.init = init_1.default;
const natives_1 = require("./natives");
Object.defineProperty(exports, "nativeCommands", { enumerable: true, get: function () { return natives_1.nativeCommands; } });
Object.defineProperty(exports, "nativeFunctions", { enumerable: true, get: function () { return natives_1.nativeFunctions; } });
const handlers_1 = require("./handlers");
Object.defineProperty(exports, "handleCommand", { enumerable: true, get: function () { return handlers_1.handleCommand; } });
Object.defineProperty(exports, "handleKeyDown", { enumerable: true, get: function () { return handlers_1.handleKeyDown; } });
Object.defineProperty(exports, "handleInput", { enumerable: true, get: function () { return handlers_1.handleInput; } });
//# sourceMappingURL=index.js.map