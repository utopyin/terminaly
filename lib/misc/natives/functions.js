export default (setOutputs) => {
    function addOutput(output) {
        setOutputs((old) => [...old, output]);
    }
    return {
        echo: (output) => addOutput(output),
        dl: (file) => {
            function fetcha(link) {
                fetch(link, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/pdf',
                    },
                })
                    .then((response) => response.blob())
                    .then((blob) => {
                    var _a;
                    // Create blob link to download
                    const url = window.URL.createObjectURL(new Blob([blob]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `FileName.png`);
                    // Append to html link element page
                    document.body.appendChild(link);
                    // Start download
                    link.click();
                    // Clean up and remove the link
                    (_a = link.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(link);
                });
            }
            addOutput({
                text: `<a href="">Click to download ${file.filename}.</a>`,
                type: 'success',
                onClick: fetcha.bind(null, file.link),
            });
        }
    };
};
//# sourceMappingURL=functions.js.map