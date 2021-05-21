"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(keywords, id) {
    const editor = document.getElementById(`terminaly_field_${id}`);
    function getTextSegments(element) {
        const textSegments = [];
        Array.from(element.childNodes).forEach((node) => {
            switch (node.nodeType) {
                case Node.TEXT_NODE:
                    textSegments.push({ text: node.nodeValue, node });
                    break;
                case Node.ELEMENT_NODE:
                    textSegments.splice(textSegments.length, 0, ...(getTextSegments(node)));
                    break;
                default:
                    throw new Error(`Unexpected node type: ${node.nodeType}`);
            }
        });
        return textSegments;
    }
    function restoreSelection(absoluteAnchorIndex, absoluteFocusIndex) {
        if (editor) {
            const sel = window.getSelection();
            if (sel) {
                const textSegments = getTextSegments(editor);
                let anchorNode = editor;
                let anchorIndex = 0;
                let focusNode = editor;
                let focusIndex = 0;
                let currentIndex = 0;
                textSegments.forEach(({ text, node }) => {
                    const startIndexOfNode = currentIndex;
                    const endIndexOfNode = startIndexOfNode + (text ? text.length : 0);
                    if (absoluteAnchorIndex !== null && startIndexOfNode <= absoluteAnchorIndex && absoluteAnchorIndex <= endIndexOfNode) {
                        anchorNode = node;
                        anchorIndex = absoluteAnchorIndex - startIndexOfNode;
                    }
                    if (absoluteFocusIndex !== null && startIndexOfNode <= absoluteFocusIndex && absoluteFocusIndex <= endIndexOfNode) {
                        focusNode = node;
                        focusIndex = absoluteFocusIndex - startIndexOfNode;
                    }
                    currentIndex += text ? text.length : 0;
                });
                sel.setBaseAndExtent(anchorNode, anchorIndex, focusNode, focusIndex);
            }
        }
    }
    function renderText(text) {
        const words = text.split(/(\s+)/);
        const output = words.map((word) => {
            const kWord = keywords.find(keyword => keyword.name == word.toUpperCase());
            return kWord ?
                `<span class="terminaly_keyword" style="${kWord.color == 'default'
                    ? null : `color: ${kWord.color}`}">${word}</span>`
                : word;
        });
        return output.join('') + ' ';
    }
    function updateEditor() {
        if (editor) {
            const sel = window.getSelection();
            if (sel) {
                const textSegments = getTextSegments(editor);
                const textContent = textSegments.map(({ text }) => text).join('');
                let anchorIndex = null;
                let focusIndex = null;
                let currentIndex = 0;
                textSegments.forEach(({ text, node }) => {
                    if (node === sel.anchorNode) {
                        anchorIndex = currentIndex + sel.anchorOffset;
                    }
                    if (node === sel.focusNode) {
                        focusIndex = currentIndex + sel.focusOffset;
                    }
                    text ? currentIndex += text.length : null;
                });
                editor.innerHTML = renderText(textContent);
                restoreSelection(anchorIndex, focusIndex);
            }
        }
    }
    editor === null || editor === void 0 ? void 0 : editor.addEventListener('input', updateEditor);
}
exports.default = default_1;
//# sourceMappingURL=inputLine.js.map