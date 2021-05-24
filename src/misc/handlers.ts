import {  } from '../types';
import { EventEmitter } from 'events';

export function handleCommand(commandHandler: EventEmitter, input: string | undefined) {
  if (input) {
    const args = input.trim().match(/[\S]*/g)?.filter(arg => arg.length);
    const commandName = args?.shift();

    commandName ? commandHandler.emit(commandName, args) ? null
      : commandHandler.emit('error', commandName)
    : null
  }
};

export function handleKeyDown(
  commandHandler: EventEmitter,
  event: React.KeyboardEvent<HTMLDivElement>,
  inputText: string | null,
  cmdHistory: string[],
  setCmdHistory: React.Dispatch<React.SetStateAction<string[]>>,
  setCmdHistoryIndex: (value: React.SetStateAction<number | null>) => void) {
    if (event.key == 'ArrowUp') {
      setCmdHistoryIndex(oldIndex => oldIndex === null ?
        0 : cmdHistory[oldIndex] !== undefined
          ? cmdHistory[oldIndex + 1] !== undefined
          ? oldIndex + 1
          : oldIndex : oldIndex
      )
    } else if (event.key == 'ArrowDown') {
      setCmdHistoryIndex(oldIndex => oldIndex === null ?
        0 : cmdHistory[oldIndex] !== undefined
          ? cmdHistory[oldIndex - 1] !== undefined
          ? oldIndex - 1
          : oldIndex : oldIndex
      )
    } else {
      setCmdHistoryIndex(null);
    }
    if (event.key != 'Enter') return;
    const innerHTML = (event.target as Element).innerHTML
    setCmdHistory(oldCmds => [innerHTML, ...oldCmds]);
    (event.target as Element).innerHTML = '';
    handleCommand(commandHandler, inputText?.trim());
}

export function handleInput(
  event: React.FormEvent<HTMLDivElement>,
  setInputText: React.Dispatch<React.SetStateAction<string | null>>) {
  
  setInputText((event.target as Element).textContent)
}