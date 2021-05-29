import React from 'react';
function fetcha({ link, filename }) {
    fetch(link, {
        method: 'GET'
    })
        .then((response) => response.blob())
        .then((blob) => {
        var _a;
        const extension = blob.type.split('/').slice(-1, blob.type.split('/').length);
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${filename || 'default'}.${extension}`);
        document.body.appendChild(link);
        link.click();
        (_a = link.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(link);
    });
}
function Attach(file) {
    return (React.createElement("div", { className: 'attachment-object', onClick: () => fetcha(file) },
        React.createElement("span", { style: { cursor: 'pointer', textDecoration: 'underline' }, className: 'terminaly_attachment' },
            "Click to download ",
            file.filename || 'file',
            ".")));
}
function Attachs({ attachments }) {
    return (React.createElement("div", { className: "attachments-container" }, attachments === null || attachments === void 0 ? void 0 : attachments.map((file, index) => {
        return React.createElement(Attach, Object.assign({ key: index }, file));
    })));
}
function Output({ text, onMouseOver, onClick, attachments }) {
    return (React.createElement("div", { className: "terminaly_output" },
        React.createElement("span", { dangerouslySetInnerHTML: { __html: text }, onClick: onClick, onMouseOver: onMouseOver }),
        React.createElement(Attachs, { attachments: attachments })));
}
export default function Outputs({ outputs }) {
    return (React.createElement("div", { className: "terminaly_outputs" }, outputs.map((output, index) => React.createElement(Output, Object.assign({ key: index }, output)))));
}
//# sourceMappingURL=Outputs.js.map