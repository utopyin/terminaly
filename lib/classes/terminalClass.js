"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCommandHandler = void 0;
const events_1 = require("events");
const CommandHandler = new events_1.EventEmitter();
CommandHandler.on('error', ({ commandName, args, natives }) => {
    natives.echo({ text: `The command <span style="color: red">${commandName}</span> does not exist.`, type: 'error' });
});
CommandHandler.on('cd', (args, natives, errorInterface) => { });
CommandHandler.on('ls', (args, natives, errorInterface) => { });
CommandHandler.on('mkdir', (args, natives, errorInterface) => { });
CommandHandler.on('pwd', (args, natives, errorInterface) => { });
function initCommandHandler(commands, callback) {
    let keywords = [];
    commands.forEach(command => {
        CommandHandler.on(command.name, command.handler);
        keywords.push({ name: command.name.toUpperCase(), color: command.color });
    });
    callback(keywords);
}
exports.initCommandHandler = initCommandHandler;
exports.default = CommandHandler;
//# sourceMappingURL=terminalClass.js.map