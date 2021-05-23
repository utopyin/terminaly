import { EventEmitter } from 'events';
import { commandKeywordInterface, terminalyInterface, commandInterface, nativeFunctionsInterface, outputInterface } from './types'
import { nativeCommands } from './misc/natives'

export default class Terminaly {

  id;
  sessionName;
  customProps;
  customStyle;
  commands;
  commandHandler;
  nativeHandler;
  keywords: commandKeywordInterface[];
  echo: (output: outputInterface) => void;
  addCommand: (command: commandInterface) => void;
  addCommands: (commands: commandInterface[]) => void;

  constructor({
    id = '',
    sessionName,
    customProps,
    customStyle
  }: terminalyInterface) {
    this.id = id;
    this.sessionName = sessionName;
    this.customProps = customProps;
    this.customStyle = customStyle;
    this.keywords = [];
    this.commands = nativeCommands
    this.commandHandler = new EventEmitter();
    this.nativeHandler = new EventEmitter();
    this.echo = (output: outputInterface) => {
      nativeEmit('echo', output)
    }
    this.addCommand = (command) => {
      this.commands.push(command)
      this.keywords.push({name: command.name, color: command.keywordColor})
    };
    this.addCommands = (commands) => {
      commands.forEach(command => {
        this.commands.push(command)
        this.keywords.push({name: command.name, color: command.keywordColor})
      })
    };
    
    const nativeEmit = (eventName: string, ...args: any[]) => {
      this.nativeHandler.emit(eventName, ...args);
    }
  }
}