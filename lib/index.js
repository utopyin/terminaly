"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerminalyWindow = void 0;
const react_1 = __importStar(require("react"));
const Outputs_1 = __importDefault(require("./components/Outputs"));
const misc_1 = require("./misc");
const terminal_1 = __importDefault(require("./terminal"));
require("../styles/index.css");
const defaultStyle = {
    fontSize: "14px",
    color: "white",
    keywordColor: "rgb(81, 246, 164)"
};
function TerminalyWindow({ id = "", sessionName, customProps, customStyle, commandHandler, keywords, commands }) {
    const [IP, setIP] = react_1.useState(null);
    const [inputText, setInputText] = react_1.useState("");
    const [outputs, setOutputs] = react_1.useState([]);
    const style = Object.assign(Object.assign({}, defaultStyle), customStyle);
    const natives = misc_1.nativeFunctions(setOutputs);
    react_1.useEffect(() => misc_1.init(setIP, keywords, id, natives, commandHandler, commands), []);
    return (react_1.default.createElement("div", Object.assign({}, customProps, { className: 'terminaly_', id: `terminaly_${id}`, style: Object.assign(Object.assign({}, style), { ['--terminaly_keyword']: style.keywordColor }) }),
        react_1.default.createElement(Outputs_1.default, { outputs: outputs }),
        react_1.default.createElement("div", { className: "terminaly_line" },
            react_1.default.createElement("p", null, sessionName ? sessionName : IP ? IP : "user"),
            react_1.default.createElement("div", { contentEditable: true, onInput: (event) => misc_1.handleInput(event, setInputText), onKeyDown: (event) => misc_1.handleKeyDown(commandHandler, event, inputText), spellCheck: "false", className: 'terminaly_field', id: `terminaly_field_${id}` }))));
}
exports.TerminalyWindow = TerminalyWindow;
exports.default = terminal_1.default;
//# sourceMappingURL=index.js.map