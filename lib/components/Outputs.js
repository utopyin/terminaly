import React from 'react';
function Output({ text, onMouseOver, onClick }) {
    return (React.createElement("div", { className: "terminaly_output" },
        React.createElement("span", { dangerouslySetInnerHTML: { __html: text }, onClick: onClick, onMouseOver: onMouseOver })));
}
export default function Outputs({ outputs }) {
    return (React.createElement("div", { className: "terminaly_outputs" }, outputs.map((output, index) => React.createElement(Output, Object.assign({ key: index }, output)))));
}
//# sourceMappingURL=Outputs.js.map