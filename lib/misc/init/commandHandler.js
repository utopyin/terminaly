function checkArgs(arguments_, args) {
    return (arguments_.map((argument, index) => {
        if (argument.required && args[index] === undefined) {
            return {
                argument: args[index],
                isValid: false,
                message: `Argument ${index + 1} of type ${argument.type} was required but was not submitted.`
            };
        }
        ;
        switch (argument.type) {
            case 'any':
                return {
                    argument: args[index],
                    isValid: true,
                    message: ''
                };
            case 'string':
                return {
                    argument: args[index],
                    isValid: /(^'.+'$)|(^".+"$)/g.test(args[index]),
                    message: `${/(^'.+'$)|(^".+"$)/g.test(args[index]) ? '' : `${args[index]} should be a string.`}`
                };
            case 'number':
                return {
                    argument: args[index],
                    isValid: /[0-9]/g.test(args[index]),
                    message: `${/[0-9]/g.test(args[index]) ? '' : `${args[index]} should be a number.`}`
                };
            case 'link':
                return {
                    argument: args[index],
                    isValid: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g.test(args[index]),
                    message: `${/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g.test(args[index]) ? '' : `${args[index]} should be a link.`}`
                };
            case 'keyword':
                return {
                    argument: args[index],
                    isValid: !(/\W/g.test(args[index])),
                    message: `${!(/\W/g.test(args[index])) ? '' : `${args[index]} should be a keyword.`}`
                };
        }
    }));
}
export default (natives, commandHandler, commands, keywords) => {
    commandHandler.on('error', (commandName) => {
        natives.echo({
            text: `The command <span style="color: red">${commandName.toLowerCase()}</span> does not exist.`,
            type: 'error'
        });
    });
    commandHandler.on('argument_error', (command, badArgs) => {
        command.onArgumentError && command.onArgumentError(badArgs);
    });
    commands.forEach(command => {
        commandHandler.on(command.name.toUpperCase(), args => {
            const parsedArgs = checkArgs(command.arguments, args);
            parsedArgs.every(argument => argument.isValid)
                ? natives.echo(command.handler(args))
                : commandHandler.emit('argument_error', command, parsedArgs.filter(({ isValid }) => !isValid)
                    .map(arg => {
                    return { argument: arg.argument, message: arg.message };
                }));
        });
        keywords.push({ name: command.name.toUpperCase(), color: command.keywordColor });
    });
};
//# sourceMappingURL=commandHandler.js.map