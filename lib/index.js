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
const react_1 = __importStar(require("react"));
require("../styles/index.css");
const init_1 = __importDefault(require("./init"));
const Outputs_1 = __importDefault(require("./Outputs"));
const defaultStyle = {
    fontSize: "14px",
    color: "white",
    keywordColor: "red"
};
const Terminaly = ({ sessionName, customProps, customStyle }) => {
    const [IP, setIP] = react_1.useState(null);
    const [inputText, setInputText] = react_1.useState("");
    const [outputs, setOutputs] = react_1.useState([]);
    const style = Object.assign(Object.assign({}, defaultStyle), customStyle);
    react_1.useEffect(init_1.default.bind(null, setIP), []);
    function handleKeyDown(event) {
        if (event.key != 'Enter')
            return;
        event.target.innerHTML = '';
        setOutputs(old => [...old, { text: inputText || '', type: 'success' }]);
    }
    function handleInput(event) {
        setInputText(event.target.textContent);
    }
    return (react_1.default.createElement("div", Object.assign({}, customProps, { id: "terminaly_", style: Object.assign(Object.assign({}, style), { ['--terminaly_keyword']: style.keywordColor }) }),
        react_1.default.createElement(Outputs_1.default, { outputs: outputs }),
        react_1.default.createElement("div", { id: "terminaly_line" },
            react_1.default.createElement("p", null, sessionName ? sessionName : IP ? IP : "user"),
            react_1.default.createElement("div", { contentEditable: true, onInput: handleInput, onKeyDown: handleKeyDown, spellCheck: "false", id: "terminaly_field" }))));
};
exports.default = Terminaly;
//# sourceMappingURL=index.js.map