import React from 'react'
import { Output as OutputInterface } from './index'

interface OutputsProps {
  outputs: OutputInterface[]
}

function Output(output: OutputInterface) {
  return (
    <div className="terminaly_output" {...output}>
      {output.text}
    </div>
  )
}

export default function Outputs({outputs}: OutputsProps) {
  return (
    <div id="terminaly_outputs">
      {outputs.map((output, index) => <Output key={index} {...output} />)}
    </div>
  ) 
}