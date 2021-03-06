/// <reference types="react" />
import { EventEmitter } from 'events';
export declare function handleCommand(commandHandler: EventEmitter, input: string | undefined): void;
export declare function handleKeyDown(commandHandler: EventEmitter, event: React.KeyboardEvent<HTMLDivElement>, inputText: string | null, cmdHistory: string[], setCmdHistory: React.Dispatch<React.SetStateAction<string[]>>, setCmdHistoryIndex: (value: React.SetStateAction<number | null>) => void): void;
export declare function handleInput(event: React.FormEvent<HTMLDivElement>, setInputText: React.Dispatch<React.SetStateAction<string | null>>): void;
//# sourceMappingURL=handlers.d.ts.map