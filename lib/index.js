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
    const [cmdHistory, setCmdHistory] = useState([]);
    const [cmdHistoryIndex, setCmdHistoryIndex] = useState(null);
    const style = Object.assign(Object.assign({}, defaultStyle), customStyle);
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
    return (React.createElement("div", Object.assign({ className: "terminaly_container" }, customProps, { style: Object.assign(Object.assign({}, style), { ['--terminaly_keyword']: style.keywordColor }) }),
        React.createElement("div", { className: 'terminaly_', id: `terminaly_${id}` },
            React.createElement(Outputs, { outputs: outputs }),
            React.createElement("div", { className: "terminaly_line" },
                React.createElement("p", null, sessionName ? sessionName : IP ? IP : "user"),
                React.createElement("div", { contentEditable: true, onInput: (event) => handleInput(event, setInputText), onKeyDown: (event) => {
                        handleKeyDown(commandHandler, event, inputText, cmdHistory, setCmdHistory, setCmdHistoryIndex);
                    }, spellCheck: "false", className: 'terminaly_field', id: `terminaly_field_${id}` }))),
        !(customStyle === null || customStyle === void 0 ? void 0 : customStyle.hideBar) && React.createElement("div", { className: "terminaly_bar" })));
}
export default TerminalyInstance;
//# sourceMappingURL=index.js.map