import { outputInterface, nativeFunctionsInterface } from '../../types/'

export default (setOutputs: React.Dispatch<React.SetStateAction<any>>): nativeFunctionsInterface => {

  function addOutput(output: outputInterface) {
    setOutputs((old: outputInterface[]) => [...old, output])
  }

  return {
    echo: (output) => addOutput(output),
    dl : (file) =>{
      function fetcha(link: string) {
        fetch(link, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/pdf',
          },
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
            `FileName.png`,
          );

          // Append to html link element page
          document.body.appendChild(link);

          // Start download
          link.click();

          // Clean up and remove the link
          link.parentNode?.removeChild(link);
        });
      }

      addOutput({
        text : `<a href="">Click to download ${file.filename}.</a>`,
        type : 'success',
        onClick: fetcha.bind(null, file.link),
      })
    }
  }
}