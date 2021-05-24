const commands = [
    {
        name: 'cd',
        keywordColor: 'default',
        handler: (args) => {
            return {
                text: `This a test. ${args.length ? `Your arguments were <span style="color: var(--terminaly_keyword)">${args.join(', ')}</span> !` : ''}`,
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
        name: 'ls',
        keywordColor: 'default',
        handler: (args) => {
            return {
                text: `This a test. ${args.length ? `Your arguments were <span style="color: var(--terminaly_keyword)">${args.join(', ')}</span> !` : ''}`,
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
        name: 'pwd',
        keywordColor: 'default',
        handler: (args) => {
            return {
                text: `This a test. ${args.length ? `Your arguments were <span style="color: var(--terminaly_keyword)">${args.join(', ')}</span> !` : ''}`,
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
        name: 'mkdir',
        keywordColor: 'default',
        handler: (args) => {
            return {
                text: `This a test. ${args.length ? `Your arguments were <span style="color: var(--terminaly_keyword)">${args.join(', ')}</span> !` : ''}`,
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