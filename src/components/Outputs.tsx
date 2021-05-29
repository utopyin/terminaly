import React from 'react'
import { attachementsInterface, outputInterface, attachsProps, outputsProps } from '../types'

function fetcha({link, filename}: attachementsInterface) : void {
  fetch(link, {
    method: 'GET'
  })
  .then((response) => response.blob())
  .then((blob) => {
    const extension = blob.type.split('/').slice(-1, blob.type.split('/').length)
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `${filename || 'default'}.${extension}`,
    );
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  });
}

function Attach(file: attachementsInterface) {
  return (
    <div className='attachment-object' onClick={() => fetcha(file)}>
      <span style={{cursor: 'pointer', textDecoration: 'underline'}} className='terminaly_attachment'>Click to download {file.filename || 'file'}.</span>
    </div>
  )
}


function Attachs({attachments}: attachsProps) {
  return (
    <div className="attachments-container">
      {attachments?.map((file, index) => {
        return <Attach key={index} {...file}/>
      })}
    </div>
  )
}

function Output({text, onMouseOver, onClick, attachments}: outputInterface) {
  return (
    <div className="terminaly_output">
      <span
        dangerouslySetInnerHTML={{ __html: text }}
        onClick={onClick}
        onMouseOver={onMouseOver}>
      </span>
      <Attachs attachments={attachments}/>
    </div>
  )
}

export default function Outputs({outputs}: outputsProps) {
  return (
    <div className="terminaly_outputs">
      {outputs.map((output, index) => <Output key={index} {...output} />)}
    </div>
  ) 
}