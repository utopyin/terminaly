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
export function handleKeyDown(commandHandler, event, inputText) {
    if (event.key != 'Enter')
        return;
    event.target.innerHTML = '';
    handleCommand(commandHandler, inputText === null || inputText === void 0 ? void 0 : inputText.trim());
}
export function handleInput(event, setInputText) {
    setInputText(event.target.textContent);
}
//# sourceMappingURL=handlers.js.map