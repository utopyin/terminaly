import React, { useEffect, useState } from "react";
import Outputs from './components/Outputs';
import { init, handleKeyDown, handleInput, nativeFunctions } from './misc';
import TerminalyInstance from './terminal';
import createTheme from './themes';
import '../css/index.css';
export function TerminalyWindow({ id = "", sessionName, customProps, style, commandHandler, nativeHandler, keywords, commands }) {
    const [IP, setIP] = useState(null);
    const [inputText, setInputText] = useState("");
    const [outputs, setOutputs] = useState([]);
    const [cmdHistory, setCmdHistory] = useState([]);
    const [cmdHistoryIndex, setCmdHistoryIndex] = useState(null);
    const themes = createTheme(style);
    const natives = nativeFunctions(setOutputs);
    useEffect(() => init(setIP, keywords, id, natives, commandHandler, nativeHandler, commands), []);
    useEffect(() => {
        const editor = document.querySelector(`#terminaly_${id}`);
        editor === null || editor === void 0 ? void 0 : editor.scroll(0, editor === null || editor === void 0 ? void 0 : editor.scrollHeight);
    }, [outputs]);
    useEffect(() => {
        if (cmdHistoryIndex !== null) {
            const editor = document.querySelector(`#terminaly_field_${id}`);
            if (cmdHistory[cmdHistoryIndex] !== undefined) {
                if (editor !== null) {
                    editor.innerHTML = cmdHistory[cmdHistoryIndex];
                    const temp = document.createElement('DIV');
                    temp.innerHTML = cmdHistory[cmdHistoryIndex];
                    setInputText(temp.textContent);
                    const range = document.createRange();
                    const sel = window.getSelection();
                    range.selectNodeContents(editor);
                    range.collapse(false);
                    sel === null || sel === void 0 ? void 0 : sel.removeAllRanges();
                    sel === null || sel === void 0 ? void 0 : sel.addRange(range);
                    editor.focus();
                    range.detach();
                }
            }
        }
    }, [cmdHistoryIndex]);
    return (React.createElement("div", Object.assign({ className: "terminaly_container" }, customProps, { style: Object.assign(Object.assign({}, themes.terminaly), themes.variables) }),
        React.createElement("div", { style: Object.assign({}, themes.terminaly), className: 'terminaly_', id: `terminaly_${id}` },
            React.createElement(Outputs, { outputs: outputs }),
            React.createElement("div", { style: Object.assign({}, themes.input.container), className: "terminaly_line" },
                React.createElement("p", { style: Object.assign({}, themes.input.name) }, sessionName ? sessionName : IP ? IP : "user"),
                React.createElement("div", { style: Object.assign({}, themes.input.field), contentEditable: true, onInput: (event) => handleInput(event, setInputText), onKeyDown: (event) => {
                        handleKeyDown(commandHandler, event, inputText, cmdHistory, setCmdHistory, setCmdHistoryIndex);
                    }, spellCheck: "false", className: 'terminaly_field', id: `terminaly_field_${id}` }))),
        React.createElement("div", { style: Object.assign({}, themes.bar), className: "terminaly_bar" })));
}
export default TerminalyInstance;
//# sourceMappingURL=index.js.map