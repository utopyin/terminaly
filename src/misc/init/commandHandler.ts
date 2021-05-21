import { nativeCommandsInterface, commandInterface, commandKeywordInterface } from '../../types'
import { EventEmitter } from 'events'

export default ( natives: nativeCommandsInterface,
  commandHandler: EventEmitter,
  commands: commandInterface[],
  keywords: commandKeywordInterface[]
) => {

  commandHandler.on('error', (commandName) => {
    natives.echo({
      text: `The command <span style="color: red">${commandName}</span> does not exist.`,
      type: 'error'
    })
  });

  commands.forEach(command => {
    commandHandler.on(command.name.toUpperCase(), args => {
      natives.echo(command.handler(args));
    })
    keywords.push({name: command.name.toUpperCase(), color: command.keywordColor })
  })

}