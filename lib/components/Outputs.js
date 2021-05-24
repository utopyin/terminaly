import React from 'react';
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
function Attach(file) {
    return React.createElement("div", { className: 'attachment-object', onClick: () => fetcha(file.link) },
        React.createElement("span", { className: 'terminaly_attachment' },
            "Click to download ",
            file.filename,
            "."));
}
function Attachs({ attachments }) {
    return (React.createElement("div", { className: "attachments-container" }, attachments === null || attachments === void 0 ? void 0 : attachments.map(file => {
        return React.createElement(Attach, Object.assign({ key: file.filename }, file));
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