import { outputInterface, nativeFunctionsInterface } from '../../types/'

export default (setOutputs: React.Dispatch<React.SetStateAction<any>>): nativeFunctionsInterface => {

  function addOutput(output: outputInterface) {
    setOutputs((old: outputInterface[]) => [...old, output])
  }

  return {
    echo: (output) => addOutput(output),
    dl : (file) => addOutput({
      text : `<span>Machin texte de merde ${file.filename}</span><a href=${file.link} download><img src=../../dl.png></a>`,
      type : 'success'
    })
  }
}