![banner](https://i.ibb.co/Dp4tnVX/terminaly.png)

## Quick start

This code exports a terminaly component with the id ``exemple`` and one custom command ``random`` that requires two arguments ``min`` and ``max``.
When the user executes the command, it returns a random float between the first argument (min) and the second argument (max).

*Exporting the instance is recommended, as it will allow you to manipulate the terminaly created with this instance anywhere in the code.*

```jsx
import React from 'react';
import Terminaly, { TerminalyWindow } from 'terminaly';

export const terminalyInstance = new Terminaly({
  id: 'exemple', // default is '';
  customStyle: {
    maxWidth: '100%',
    maxHeight: '100%',
    width: 700,
    height: 400
  }
})

terminalyInstance.addCommand({
  name: 'random',
  keywordColor: 'magenta',
  handler: (args) => {
    const [min, max] = args;
    const minInt = parseInt(min);
    const maxInt = parseInt(max);
    const randomNumber = Math.random() * (maxInt - minInt) + minInt;
    return {
        text: args.length ? `The generated number is ${randomNumber}.`
        : 'Two arguments are needed: (min, max)',
        type: 'success'
    }
  }
})

export default () => <TerminalyWindow {...terminalyInstance} />
```
