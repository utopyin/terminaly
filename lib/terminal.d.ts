import { EventEmitter } from 'events';
import { commandKeywordInterface, terminalyInterface, commandInterface } from './types';
export default class Terminaly {
    id: string;
    customProps: object | undefined;
    customStyle: import("./types").customStyleInterface | undefined;
    sessionName: string | undefined;
    commandHandler: EventEmitter;
    commands: commandInterface[];
    keywords: commandKeywordInterface[];
    constructor({ id, customCommands, customProps, customStyle, sessionName }: terminalyInterface);
}
//# sourceMappingURL=terminal.d.ts.map