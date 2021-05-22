import { EventEmitter } from 'events';
import { nativeCommands } from './misc/natives';
export default class Terminaly {
    constructor({ id = '', sessionName, customProps, customStyle }) {
        this.id = id;
        this.sessionName = sessionName;
        this.customProps = customProps;
        this.customStyle = customStyle;
        this.keywords = [];
        this.commands = nativeCommands;
        this.commandHandler = new EventEmitter();
        this.addCommand = (command) => {
            this.commands.push(command);
            this.keywords.push({ name: command.name.toUpperCase(), color: command.keywordColor });
        };
        this.addCommands = (commands) => {
            commands.forEach(command => {
                this.commands.push(command);
                this.keywords.push({ name: command.name.toUpperCase(), color: command.keywordColor });
            });
        };
    }
}
//# sourceMappingURL=terminal.js.map