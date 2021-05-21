import React from 'react'
import { outputInterface } from '../types'

interface OutputsProps {
  outputs: outputInterface[]
}

function Output({text, onMouseOver, onClick}: outputInterface) {
  return (
    <div className="terminaly_output">
      <span
        dangerouslySetInnerHTML={{ __html: text }}
        onClick={onClick}
        onMouseOver={onMouseOver}>
      </span>
    </div>
  )
}

export default function Outputs({outputs}: OutputsProps) {
  return (
    <div className="terminaly_outputs">
      {outputs.map((output, index) => <Output key={index} {...output} />)}
    </div>
  ) 
}