export default (setOutputs) => {
    function addOutput(output) {
        setOutputs((old) => [...old, output]);
    }
    return {
        echo: (output) => addOutput(output),
        dl: (file) => addOutput({
            text: `<span>Machin texte de merde ${file.filename}</span><a href=${file.link} download><img src=../../dl.png></a>`,
            type: 'success'
        })
    };
};
//# sourceMappingURL=functions.js.map