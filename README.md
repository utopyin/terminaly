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
      name: 'RANDOM', // must be in upper case
      keywordColor: 'magenta', // change the color of this specific command's keyword 
      handler: (args) => {
        const [min, max] = args; // destructure the two first args 
        const min = parseInt(min);
        const max = parseInt(max);
        const randomNumber = Math.random() * (max - min) + min;
        return { // you must return an output object
           text: args.length ? `The generated number is ${randomNumber}.` : 'Two arguments are needed: (min, max)',
           type: 'success'
        }
      }
    }
  ]
})

const Terminaly = () => <TerminalyWindow {...terminalyInstance} />
```
