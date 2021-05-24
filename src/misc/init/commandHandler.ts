import { nativeFunctionsInterface, commandInterface, commandKeywordInterface, argumentInterface, checkArgsInterface, badArgsInterface, outputInterface } from '../../types'
import { EventEmitter } from 'events'

function checkArgs(arguments_: argumentInterface[], args: any): checkArgsInterface[] {
  return (
    arguments_.map((argument, index) => {
      if (argument.required && args[index] === undefined) {
        return {
          argument: args[index],
          isValid: false,
          message: `Argument ${index+1} of type ${argument.type} was required but was not submitted.`
        }
      };
      switch (argument.type) {
        case 'any':
          return {
            argument: args[index],
            isValid: true,
            message: ''
          }
        case 'string':
          const isString = /(^'.+'$)|(^".+"$)/g.test(args[index])
          return {
            argument: args[index],
            isValid: isString,
            message: `${isString ? '' : `${args[index]} should be a string.`}`
          }
        case 'number':
          const isNumber = /[0-9]/g.test(args[index])
          return {
            argument: args[index],
            isValid: isNumber,
            message: `${isNumber ? '' : `${args[index]} should be a number.`}`
          }
        case 'link':
          const isLink = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g.test(args[index])
          return {
            argument: args[index],
            isValid: isLink,
            message: `${isLink ? '' : `${args[index]} should be a link.`}`
          }
        case 'keyword':
          const isKeyword = !(/\W/g.test(args[index]))
          return {
            argument: args[index],
            isValid: isKeyword,
            message: `${isKeyword ? '' : `${args[index]} should be a keyword.`}`
          }
      }
    })
  )
}

export default (
  natives: nativeFunctionsInterface,
  commandHandler: EventEmitter,
  nativeHandler: EventEmitter,
  commands: commandInterface[],
  keywords: commandKeywordInterface[]
) => {

  commandHandler.on('error', (commandName: string) => {
    natives.echo({
      text: `The command <span style="color: red">${commandName}</span> does not exist.`,
      type: 'error'
    })
  });

  commandHandler.on('argument_error', (command: commandInterface, badArgs: badArgsInterface[]) => {
    command.onArgumentError && command.onArgumentError(badArgs);
  });

  nativeHandler.on('echo', (output: outputInterface) => {
    natives.echo(output);
  })

  commands.forEach(command => {
    commandHandler.on(command.name, args => {
      const parsedArgs = checkArgs(command.arguments, args);
      parsedArgs.every(argument => argument.isValid)
        ? (() => {
          const output = command.handler(args);
          output && natives.echo(output);
        })()
        : commandHandler.emit('argument_error',
            command,
            parsedArgs
              .filter(({isValid}) => !isValid)
              .map(arg => {
                return { argument: arg.argument, message: arg.message }
              })
        );
    })
    keywords.push({ name: command.name, color: command.keywordColor })
  })

}