import React, { useEffect, useState } from "react";
import Outputs from './components/Outputs';
import { init, handleKeyDown, handleInput, nativeFunctions } from './misc';
import { outputInterface  } from './types'
import TerminalyInstance from './terminal'
import createTheme from './themes';
import '../css/index.css'

export function TerminalyWindow ({
  id = "",
  sessionName,
  customProps,
  style,
  commandHandler,
  nativeHandler,
  keywords,
  commands
}: TerminalyInstance) {

  const [IP, setIP] = useState<string | null>(null);
  const [inputText, setInputText] = useState<string | null>("");
  const [outputs, setOutputs] = useState<outputInterface[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdHistoryIndex, setCmdHistoryIndex] = useState<number | null>(null);
  const themes = createTheme(style)
  const natives = nativeFunctions(setOutputs)
  
  useEffect(() => init(setIP, keywords, id, natives, commandHandler, nativeHandler, commands), [])

  useEffect(() => {
    const editor = document.querySelector(`#terminaly_${id}`)
    editor?.scroll(0, editor?.scrollHeight)
  }, [outputs])

  useEffect(() => {
    if (cmdHistoryIndex !== null) {
      const editor = document.querySelector(`#terminaly_field_${id}`);
      if (cmdHistory[cmdHistoryIndex] !== undefined) {
        if (editor !== null) {
          editor.innerHTML = cmdHistory[cmdHistoryIndex];
          const temp = document.createElement('DIV');
          temp.innerHTML = cmdHistory[cmdHistoryIndex];
          setInputText(temp.textContent);
          const range = document.createRange();
          const sel = window.getSelection();
          range.selectNodeContents(editor);
          range.collapse(false);
          sel?.removeAllRanges();
          sel?.addRange(range);
          (editor as HTMLDivElement).focus();
          range.detach();
        }
      }
    }
  }, [cmdHistoryIndex])

  return (
    <div
      className="terminaly_container"
      {...customProps}
      style={{
        ...themes.terminaly,
        ...themes.variables,
      }}>
      <div
        style={{
          ...themes.terminaly,
        }}
        className='terminaly_'
        id={`terminaly_${id}`}>
        <Outputs outputs={outputs}/>
        <div style={{...themes.input.container}} className="terminaly_line">
          <p style={{...themes.input.name}}>{sessionName ? sessionName : IP ? IP : "user"}</p>
          <div
            style={{...themes.input.field}}
            contentEditable
            onInput={(event) => handleInput(event, setInputText)}
            onKeyDown={(event) => {
              handleKeyDown(
                commandHandler,
                event,
                inputText,
                cmdHistory,
                setCmdHistory,
                setCmdHistoryIndex
              )
            }}
            spellCheck="false"
            className='terminaly_field'
            id={`terminaly_field_${id}`}>
          </div>
        </div>
      </div>
      <div style={{...themes.bar}} className="terminaly_bar"></div>
    </div>
  )
}

export default TerminalyInstance