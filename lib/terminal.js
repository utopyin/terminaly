"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const natives_1 = require("./misc/natives");
class Terminaly {
    constructor({ id = '"', customCommands = [], customProps, customStyle, sessionName }) {
        this.id = id;
        this.commands = [...customCommands, ...natives_1.nativeCommands];
        this.customProps = customProps;
        this.customStyle = customStyle;
        this.sessionName = sessionName;
        this.commandHandler = new events_1.EventEmitter();
        this.keywords = [];
    }
}
exports.default = Terminaly;
//# sourceMappingURL=terminal.js.map