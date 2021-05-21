import inputLine from './inputLine';
import ip from './ip';
import commandHandling from './commandHandler';
import { EventEmitter } from 'events'
import { commandKeywordInterface, nativeCommandsInterface, commandInterface } from '../../types'

export default (setIP: React.Dispatch<React.SetStateAction<string | null>>,
  keywords: commandKeywordInterface[],
  id: string,
  natives: nativeCommandsInterface,
  commandHandler: EventEmitter,
  commands: commandInterface[]
) => {
  ip(setIP);
  commandHandling(natives, commandHandler, commands, keywords);
  inputLine(keywords, id);
}