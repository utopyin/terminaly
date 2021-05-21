import { commandInterface } from '../../types'

const commands: commandInterface[] = [
  {
    name: 'CD', 
    keywordColor: 'default',
    handler: (args) => {
      return {
        text: `I'm bad at web developpement. ${args.length ? `Your arguments were <span style="color: var(--terminaly_keyword)">${args.join(', ')}</span> !` : ''}`,
        type: 'success'
      }
    }
  },
  {
    name: 'LS', 
    keywordColor: 'default',
    handler: (args) => {
      return {
        text: `I'm bad at web developpement. ${args.length ? `Your arguments were <span style="color: var(--terminaly_keyword)">${args.join(', ')}</span> !` : ''}`,
        type: 'success'
      }
    }
  },
  {
    name: 'PWD', 
    keywordColor: 'default',
    handler: (args) => {
      return {
        text: `I'm bad at web developpement. ${args.length ? `Your arguments were <span style="color: var(--terminaly_keyword)">${args.join(', ')}</span> !` : ''}`,
        type: 'success'
      }
    }
  },
  {
    name: 'MKDIR', 
    keywordColor: 'default',
    handler: (args) => {
      return {
        text: `I'm bad at web developpement. ${args.length ? `Your arguments were <span style="color: var(--terminaly_keyword)">${args.join(', ')}</span> !` : ''}`,
        type: 'success'
      }
    }
  }
]

export default commands