export function handleCommand(commandHandler, input) {
    var _a;
    if (input) {
        const args = input.split(/(\s+)/).map(arg => arg.trim()).filter(v => v !== '');
        const commandName = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toUpperCase();
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