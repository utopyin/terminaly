## Quick start

```tsx
import React from 'react';
import Terminaly, { TerminalyWindow } from 'terminaly';

const terminalyInstance = new Terminaly({
  id: 'peach', // default is ''
  customStyle: {
    maxWidth: '100%',
    maxHeight: '100%',
    width: 700,
    height: 400
  },
  customCommands: [
    {
      name: 'TEST', // must be in upper case
      keywordColor: 'lightgreen',
      handler: (args) => {
        return {
           text: args.length ? `The argument${args.length > 1 ? 's' : ''} provided ${args.length > 1 ? 'are' : 'is'} ${args.join(', ')}.`
            : 'No argument provided.',
           type: 'success',
           onClick: () => console.log('clicked!')
        }
      }
    },
    {
      name: 'RANDOM', // must be in upper case
      keywordColor: 'orange',
      handler: (args) => {
        const [min, max] = args;
        const min = parseInt(min);
        const max = parseInt(max);
        const randomNumber = Math.random() * (max - min) + min;
        return {
           text: args.length ? `The generated number is ${randomNumber}.`
            : 'Two arguments are needed: (min, max)',
           type: 'success'
        }
      }
    }
  ]
})

const Terminaly = () => <TerminalyWindow {...terminalyInstance} />
```
