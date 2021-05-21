"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInput = exports.handleKeyDown = exports.handleCommand = void 0;
function handleCommand(commandHandler, input) {
    var _a;
    if (input) {
        const args = input.split(/(\s+)/).map(arg => arg.trim()).filter(v => v !== '');
        const commandName = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toUpperCase();
        commandName ? commandHandler.emit(commandName, args) ? null
            : commandHandler.emit('error', commandName)
            : null;
    }
}
exports.handleCommand = handleCommand;
;
function handleKeyDown(commandHandler, event, inputText) {
    if (event.key != 'Enter')
        return;
    event.target.innerHTML = '';
    handleCommand(commandHandler, inputText === null || inputText === void 0 ? void 0 : inputText.trim());
}
exports.handleKeyDown = handleKeyDown;
function handleInput(event, setInputText) {
    setInputText(event.target.textContent);
}
exports.handleInput = handleInput;
//# sourceMappingURL=handlers.js.map