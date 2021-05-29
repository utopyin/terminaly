import { stylePropertyInterface, themeInterface } from '../types'
import themes from './themes'

export default (style: stylePropertyInterface): themeInterface => {
  const {textColor, keywordColor} = style.custom || {};
  const theme = themes({textColor, keywordColor})[style.theme]
  const custom = style.custom
  return {
    terminaly: {
      ...theme.terminaly,
      ...custom?.terminaly
    },
    input: {
      container: {
        ...theme.input.container,
        ...custom?.input?.container
      },
      name: {
        ...theme.input.name,
        ...custom?.input?.name
      },
      field: {
        ...theme.input.field,
        ...custom?.input?.field
      }
    },
    bar: {
      ...theme.bar,
      ...custom?.bar
    },
    outputs: {
      container: {
        ...theme.outputs.container,
        ...custom?.outputs?.container
      },
      item: {
        ...theme.outputs.item,
        ...custom?.outputs?.item
      }
    },
    variables: {
      ...theme.variables,
      ...custom?.variables
    }
  }
}