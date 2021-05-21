"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (natives, commandHandler, commands, keywords) => {
    commandHandler.on('error', (commandName) => {
        natives.echo({
            text: `The command <span style="color: red">${commandName}</span> does not exist.`,
            type: 'error'
        });
    });
    commands.forEach(command => {
        commandHandler.on(command.name.toUpperCase(), args => {
            natives.echo(command.handler(args));
        });
        keywords.push({ name: command.name.toUpperCase(), color: command.keywordColor });
    });
};
//# sourceMappingURL=commandHandler.js.map