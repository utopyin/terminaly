import { EventEmitter } from 'events';
import { commandKeywordInterface, terminalyInterface, commandInterface } from './types'
import { nativeCommands } from './misc/natives'

export default class Terminaly {

  id;
  customProps;
  customStyle;
  sessionName;
  commandHandler;
  commands;
  addCommand: (command: commandInterface) => void;
  addCommands: (commands: commandInterface[]) => void;
  keywords: commandKeywordInterface[];

  constructor({
    id = '',
    customProps,
    customStyle,
    sessionName
  }: terminalyInterface) {
    this.id = id;
    this.commands = nativeCommands
    this.customProps = customProps;
    this.customStyle = customStyle;
    this.sessionName = sessionName;
    this.commandHandler = new EventEmitter();
    this.keywords = [];
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
  }
}