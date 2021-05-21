"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const natives_1 = require("./misc/natives");
class Terminaly {
    constructor({ id = '', customProps, customStyle, sessionName }) {
        this.id = id;
        this.commands = natives_1.nativeCommands;
        this.customProps = customProps;
        this.customStyle = customStyle;
        this.sessionName = sessionName;
        this.commandHandler = new events_1.EventEmitter();
        this.keywords = [];
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
    }
}
exports.default = Terminaly;
//# sourceMappingURL=terminal.js.map