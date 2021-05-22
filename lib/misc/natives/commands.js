const commands = [
    {
        name: 'CD',
        keywordColor: 'default',
        handler: (args) => {
            return {
                text: `I'm bad at web developpement. ${args.length ? `Your arguments were <span style="color: var(--terminaly_keyword)">${args.join(', ')}</span> !` : ''}`,
                type: 'success'
            };
        },
        onArgumentError: (badArgs) => {
            badArgs.forEach(arg => {
                console.log(arg.message);
            });
        },
        arguments: [{
                required: false,
                type: 'any'
            }]
    },
    {
        name: 'LS',
        keywordColor: 'default',
        handler: (args) => {
            return {
                text: `I'm bad at web developpement. ${args.length ? `Your arguments were <span style="color: var(--terminaly_keyword)">${args.join(', ')}</span> !` : ''}`,
                type: 'success'
            };
        },
        onArgumentError: (badArgs) => {
            badArgs.forEach(arg => {
                console.log(arg.message);
            });
        },
        arguments: [{
                required: false,
                type: 'any'
            }]
    },
    {
        name: 'PWD',
        keywordColor: 'default',
        handler: (args) => {
            return {
                text: `I'm bad at web developpement. ${args.length ? `Your arguments were <span style="color: var(--terminaly_keyword)">${args.join(', ')}</span> !` : ''}`,
                type: 'success'
            };
        },
        onArgumentError: (badArgs) => {
            badArgs.forEach(arg => {
                console.log(arg.message);
            });
        },
        arguments: [{
                required: false,
                type: 'any'
            }]
    },
    {
        name: 'MKDIR',
        keywordColor: 'default',
        handler: (args) => {
            return {
                text: `I'm bad at web developpement. ${args.length ? `Your arguments were <span style="color: var(--terminaly_keyword)">${args.join(', ')}</span> !` : ''}`,
                type: 'success'
            };
        },
        onArgumentError: (badArgs) => {
            badArgs.forEach(arg => {
                console.error(arg.message);
            });
        },
        arguments: [{
                required: false,
                type: 'any'
            }]
    }
];
export default commands;
//# sourceMappingURL=commands.js.map