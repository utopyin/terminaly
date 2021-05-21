import { EventEmitter } from 'events';
import { commandKeywordInterface, terminalyInterface, commandInterface } from './types'
import { nativeCommands } from './misc/natives'

export default class Terminaly {

  id;
  customProps;
  customStyle;
  sessionName;
  commandHandler;
  commands: commandInterface[];
  keywords: commandKeywordInterface[];

  constructor({
    id = '"',
    customCommands = [],
    customProps,
    customStyle,
    sessionName
  }: terminalyInterface) {
    this.id = id
    this.commands = [...customCommands, ...nativeCommands]
    this.customProps = customProps
    this.customStyle = customStyle
    this.sessionName = sessionName
    this.commandHandler = new EventEmitter();
    this.keywords = []
  }
}