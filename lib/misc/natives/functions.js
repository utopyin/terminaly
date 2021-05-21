"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (setOutputs) => {
    function addOutput(output) {
        setOutputs((old) => [...old, output]);
    }
    return {
        echo: (output) => addOutput(output)
    };
};
//# sourceMappingURL=functions.js.map