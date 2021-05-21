## Quick start

This code exports a terminaly component with the id ``peach`` and one custom command ``random`` that requires two arguments ``min`` and ``max``.
When the user executes the command, it returns a random float between the first argument (min) and the second argument (max).

*Exporting the instance is advised, as it will allow you to manipulate the terminaly created with this instance anywhere in the code.*

```jsx
import React from 'react';
import Terminaly, { TerminalyWindow } from 'terminaly';

export const terminalyInstance = new Terminaly({
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

export default () => <TerminalyWindow {...terminalyInstance} />
```
