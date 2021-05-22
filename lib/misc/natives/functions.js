export default (setOutputs) => {
    function addOutput(output) {
        setOutputs((old) => [...old, output]);
    }
    return {
        echo: (output) => addOutput(output)
    };
};
//# sourceMappingURL=functions.js.map