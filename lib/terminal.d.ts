import { EventEmitter } from 'events';
import { commandKeywordInterface, terminalyInterface, commandInterface, outputInterface } from './types';
export default class Terminaly {
    id: string;
    sessionName: string | undefined;
    customProps: object | undefined;
    customStyle: import("./types").customStyleInterface | undefined;
    commands: commandInterface[];
    commandHandler: EventEmitter;
    nativeHandler: EventEmitter;
    keywords: commandKeywordInterface[];
    echo: (output: outputInterface) => void;
    addCommand: (command: commandInterface) => void;
    addCommands: (commands: commandInterface[]) => void;
    constructor({ id, sessionName, customProps, customStyle }: terminalyInterface);
}
//# sourceMappingURL=terminal.d.ts.map