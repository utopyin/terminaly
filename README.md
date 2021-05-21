## Quick start

```tsx
import React from 'react';
import Terminaly, { TerminalyWindow } from 'terminaly';

const terminalyInstance = new Terminaly({
  id: 'peach', // default is '';
  commands: [
    {
      name: 'TEST', // must be in upper case
      keywordColor: 'lightgreen',
      handler: (args) => {
        return {
           text: args.length ? `The arguments provided are ${args.join(', ')}.`
            : 'No arguments provided.',
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
        min = parseInt(min);
        max = parseInt(max);
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

const App = () => <TerminalyWindow {...terminalyInstance} />
```
