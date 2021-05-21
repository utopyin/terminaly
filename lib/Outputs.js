"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function Output(output) {
    return (react_1.default.createElement("div", { className: "terminaly_output" },
        react_1.default.createElement("span", Object.assign({}, output, { dangerouslySetInnerHTML: { __html: output.text } }))));
}
function Outputs({ outputs }) {
    return (react_1.default.createElement("div", { id: "terminaly_outputs" }, outputs.map((output, index) => react_1.default.createElement(Output, Object.assign({ key: index }, output)))));
}
exports.default = Outputs;
//# sourceMappingURL=Outputs.js.map