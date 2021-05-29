import { EventEmitter } from 'events';
import { nativeCommands } from './misc/natives';
export default class Terminaly {
    constructor({ id = '', sessionName, customProps, style }) {
        this.id = id;
        this.sessionName = sessionName;
        this.customProps = customProps;
        this.style = style;
        this.keywords = [];
        this.commands = nativeCommands;
        this.commandHandler = new EventEmitter();
        this.nativeHandler = new EventEmitter();
        this.echo = (output) => {
            nativeEmit('echo', output);
        };
        this.addCommand = (command) => {
            this.commands.push(command);
            this.keywords.push({ name: command.name, color: command.keywordColor });
        };
        this.addCommands = (commands) => {
            commands.forEach(command => {
                this.commands.push(command);
                this.keywords.push({ name: command.name, color: command.keywordColor });
            });
        };
        const nativeEmit = (eventName, ...args) => {
            this.nativeHandler.emit(eventName, ...args);
        };
    }
}
//# sourceMappingURL=terminal.js.map