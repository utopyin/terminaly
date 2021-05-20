import React, { KeyboardEventHandler, useEffect, useState } from "react";
import '../styles/index.css'
import init from './init'
import Outputs from './Outputs'

interface customStyle extends React.CSSProperties {
  keywordColor: string;
} 

interface props {
  sessionName?: string;
  id?: string | number;
  customProps: object;
  customStyle: customStyle;
}

export interface Output {
  text: string;
  type: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onHover?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const defaultStyle = {
  fontSize: "14px",
  color: "white",
  keywordColor: "rgb(81, 246, 164)"
}

const Terminaly = ({
  sessionName,
  customProps,
  customStyle
}: props
) => {

  const [IP, setIP] = useState<string | null>(null);
  const [inputText, setInputText] = useState<string | null>("");
  const [outputs, setOutputs] = useState<Output[]>([]);
  const style = {...defaultStyle, ...customStyle};

  useEffect(init.bind(null, setIP), [])
  
  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key != 'Enter') return;
    (event.target as Element).innerHTML = '';
    setOutputs(old => [...old, {text: inputText || '', type: 'success'}]);
  }

  function handleInput(event: React.FormEvent<HTMLDivElement>) {
    setInputText((event.target as Element).textContent)
  }

  return (
    <div
      {...customProps}
      id="terminaly_"
      style={{
        ...style,
        ['--terminaly_keyword' as any]: style.keywordColor
      }}>
      <Outputs outputs={outputs}/>
      <div id="terminaly_line">
        <p>{sessionName ? sessionName : IP ? IP : "user"}</p>
        <div
          contentEditable
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          spellCheck="false"
          id="terminaly_field">
        </div>
      </div>
    </div>
  )
}

export default Terminaly