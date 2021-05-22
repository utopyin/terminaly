import { EventEmitter } from 'events';
import { commandKeywordInterface, terminalyInterface, commandInterface } from './types';
export default class Terminaly {
    id: string;
    sessionName: string | undefined;
    customProps: object | undefined;
    customStyle: import("./types").customStyleInterface | undefined;
    keywords: commandKeywordInterface[];
    commands: commandInterface[];
    commandHandler: EventEmitter;
    addCommand: (command: commandInterface) => void;
    addCommands: (commands: commandInterface[]) => void;
    constructor({ id, sessionName, customProps, customStyle }: terminalyInterface);
}
//# sourceMappingURL=terminal.d.ts.map