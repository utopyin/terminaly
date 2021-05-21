import { outputInterface, nativeCommandsInterface } from '../../types/'

export default (setOutputs: React.Dispatch<React.SetStateAction<any>>): nativeCommandsInterface => {

  function addOutput(output: outputInterface) {
    setOutputs((old: outputInterface[]) => [...old, output])
  }

  return {
    echo: (output) => addOutput(output)
  }
}