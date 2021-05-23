import React, { useEffect, useState } from "react";
import Outputs from './components/Outputs';
import { init, handleKeyDown, handleInput, nativeFunctions } from './misc';
import TerminalyInstance from './terminal';
import '../styles/index.css';
const defaultStyle = {
    fontSize: "14px",
    color: "white",
    keywordColor: "rgb(81, 246, 164)"
};
export function TerminalyWindow({ id = "", sessionName, customProps, customStyle, commandHandler, nativeHandler, keywords, commands }) {
    const [IP, setIP] = useState(null);
    const [inputText, setInputText] = useState("");
    const [outputs, setOutputs] = useState([]);
    const style = Object.assign(Object.assign({}, defaultStyle), customStyle);
    const natives = nativeFunctions(setOutputs);
    useEffect(() => init(setIP, keywords, id, natives, commandHandler, nativeHandler, commands), []);
    return (React.createElement("div", Object.assign({}, customProps, { className: 'terminaly_', id: `terminaly_${id}`, style: Object.assign(Object.assign({}, style), { ['--terminaly_keyword']: style.keywordColor }) }),
        React.createElement(Outputs, { outputs: outputs }),
        React.createElement("div", { className: "terminaly_line" },
            React.createElement("p", null, sessionName ? sessionName : IP ? IP : "user"),
            React.createElement("div", { contentEditable: true, onInput: (event) => handleInput(event, setInputText), onKeyDown: (event) => handleKeyDown(commandHandler, event, inputText), spellCheck: "false", className: 'terminaly_field', id: `terminaly_field_${id}` }))));
}
export default TerminalyInstance;
//# sourceMappingURL=index.js.map