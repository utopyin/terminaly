export function handleCommand(commandHandler, input) {
    var _a;
    if (input) {
        const args = (_a = input.trim().match(/[\S]*/g)) === null || _a === void 0 ? void 0 : _a.filter(arg => arg.length);
        const commandName = args === null || args === void 0 ? void 0 : args.shift();
        commandName ? commandHandler.emit(commandName, args) ? null
            : commandHandler.emit('error', commandName)
            : null;
    }
}
;
export function handleKeyDown(commandHandler, event, inputText, cmdHistory, setCmdHistory, setCmdHistoryIndex) {
    if (event.key == 'ArrowUp') {
        setCmdHistoryIndex(oldIndex => oldIndex === null ?
            0 : cmdHistory[oldIndex] !== undefined
            ? cmdHistory[oldIndex + 1] !== undefined
                ? oldIndex + 1
                : oldIndex : oldIndex);
    }
    else if (event.key == 'ArrowDown') {
        setCmdHistoryIndex(oldIndex => oldIndex === null ?
            0 : cmdHistory[oldIndex] !== undefined
            ? cmdHistory[oldIndex - 1] !== undefined
                ? oldIndex - 1
                : oldIndex : oldIndex);
    }
    else {
        setCmdHistoryIndex(null);
    }
    if (event.key != 'Enter')
        return;
    const innerHTML = event.target.innerHTML;
    setCmdHistory(oldCmds => [innerHTML, ...oldCmds]);
    event.target.innerHTML = '';
    handleCommand(commandHandler, inputText === null || inputText === void 0 ? void 0 : inputText.trim());
}
export function handleInput(event, setInputText) {
    setInputText(event.target.textContent);
}
//# sourceMappingURL=handlers.js.map