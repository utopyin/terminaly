import {  } from '../types';
import { EventEmitter } from 'events';

export function handleCommand(commandHandler: EventEmitter, input: string | undefined) {
  if (input) {
    const args = input.trim().match(/[\S]*/g)?.filter(arg => arg.length);
    const commandName = args?.shift()?.toUpperCase();

    commandName ? commandHandler.emit(commandName, args) ? null
      : commandHandler.emit('error', commandName)
    : null
  }
};

export function handleKeyDown(
  commandHandler: EventEmitter,
  event: React.KeyboardEvent<HTMLDivElement>,
  inputText: string | null) {

  if (event.key != 'Enter') return;
  (event.target as Element).innerHTML = '';
  handleCommand(commandHandler, inputText?.trim());
}

export function handleInput(
  event: React.FormEvent<HTMLDivElement>,
  setInputText: React.Dispatch<React.SetStateAction<string | null>>) {
    
  setInputText((event.target as Element).textContent)
}