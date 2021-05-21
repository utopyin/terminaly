import { EventEmitter } from 'events';
import { commandKeywordInterface, terminalyInterface, commandInterface } from './types';
export default class Terminaly {
    id: string;
    customProps: object | undefined;
    customStyle: import("./types").customStyleInterface | undefined;
    sessionName: string | undefined;
    commandHandler: EventEmitter;
    commands: commandInterface[];
    addCommand: (command: commandInterface) => void;
    addCommands: (commands: commandInterface[]) => void;
    keywords: commandKeywordInterface[];
    constructor({ id, customProps, customStyle, sessionName }: terminalyInterface);
}
//# sourceMappingURL=terminal.d.ts.map