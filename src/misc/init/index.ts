/// <reference lib="es2017.object"/>

import inputLine from './inputLine';
import ip from './ip';
import commandHandling from './commandHandler';
import { EventEmitter } from 'events'
import { commandKeywordInterface, nativeFunctionsInterface, commandInterface } from '../../types'

export default (setIP: React.Dispatch<React.SetStateAction<string | null>>,
  keywords: commandKeywordInterface[],
  id: string,
  natives: nativeFunctionsInterface,
  commandHandler: EventEmitter,
  nativeHandler: EventEmitter,
  commands: commandInterface[]
) => {
  ip(setIP);
  commandHandling(natives, commandHandler, nativeHandler, commands, keywords);
  inputLine(keywords, id);
}