import React, { useEffect, useState } from "react";
import Outputs from './components/Outputs';
import { init, handleKeyDown, handleInput, nativeFunctions } from './misc';
import { outputInterface  } from './types'
import Terminaly from './terminal'

import '../styles/index.css';

const defaultStyle = {
  fontSize: "14px",
  color: "white",
  keywordColor: "rgb(81, 246, 164)"
}

export function TerminalyWindow ({
  id = "",
  sessionName,
  customProps,
  customStyle,
  commandHandler,
  keywords,
  commands
}: Terminaly) {

  const [IP, setIP] = useState<string | null>(null);
  const [inputText, setInputText] = useState<string | null>("");
  const [outputs, setOutputs] = useState<outputInterface[]>([]);
  const style = {...defaultStyle, ...customStyle};

  const natives = nativeFunctions(setOutputs)

  useEffect(() => init(setIP, keywords, id, natives, commandHandler, commands), [])

  return (
    <div
      {...customProps}
      className='terminaly_'
      id={`terminaly_${id}`}
      style={{
        ...style,
        ['--terminaly_keyword' as any]: style.keywordColor
      }}>
      <Outputs outputs={outputs}/>
      <div className="terminaly_line">
        <p>{sessionName ? sessionName : IP ? IP : "user"}</p>
        <div
          contentEditable
          onInput={(event) => handleInput(event, setInputText)}
          onKeyDown={(event) => handleKeyDown(commandHandler, event, inputText)}
          spellCheck="false"
          className='terminaly_field'
          id={`terminaly_field_${id}`}>
        </div>
      </div>
    </div>
  )
}

export default Terminaly