import React from 'react'
import { attachementsInterface, outputInterface, AttachsProps, OutputsProps } from '../types'

function fetcha(link: string) : void {
  const extension = link.split('.').slice(-1, link.split('.').length)
  fetch(link, {
    method: 'GET'
  })
  .then((response) => response.blob())
  .then((blob) => {
    // Create blob link to download
    const url = window.URL.createObjectURL(
      new Blob([blob]),
    );
    const link = document.createElement('a');
    link.href = url;
    
    link.setAttribute(
      'download',
      `filename.${extension}`,
    );

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode?.removeChild(link);
  });
}

function Attach(file: attachementsInterface) {
  return <div className='attachment-object' onClick={() => fetcha(file.link)}><span className='terminaly_attachment'>Click to download {file.filename}.</span></div>
}


function Attachs({attachments}: AttachsProps) {
  return (
    <div className="attachments-container">
      {attachments?.map(file => {
        return <Attach key={file.filename}{...file}/>
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

export default function Outputs({outputs}: OutputsProps) {
  return (
    <div className="terminaly_outputs">
      {outputs.map((output, index) => <Output key={index} {...output} />)}
    </div>
  ) 
}