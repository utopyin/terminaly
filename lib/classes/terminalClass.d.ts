import { EventEmitter } from 'events';
import { commandKeyword as commandKeywordType } from '../init/inputLine';
import { nativesInterface } from '../natives';
export interface errorInterface {
    commandName: string;
    args: string[];
    natives: nativesInterface;
}
declare type paramater = {
    required: boolean;
    value: string;
};
export interface commandInterface {
    name: string;
    color: string;
    handler(parameter: paramater[]): void;
}
declare const CommandHandler: EventEmitter;
export declare function initCommandHandler(commands: commandInterface[], callback: (keywords: commandKeywordType[]) => void): void;
export default CommandHandler;
//# sourceMappingURL=terminalClass.d.ts.map