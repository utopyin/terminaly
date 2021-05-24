import { outputInterface, nativeFunctionsInterface } from '../../types/'

export default (setOutputs: React.Dispatch<React.SetStateAction<any>>): nativeFunctionsInterface => {

  function addOutput(output: outputInterface) {
    setOutputs((old: outputInterface[]) => [...old, output])
  }

  return {
    echo: (output) => addOutput(output),    
  }
}