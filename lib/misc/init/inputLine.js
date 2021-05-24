export default function (keywords, id) {
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
                    else {
                        console.log(absoluteFocusIndex);
                    }
                    if (absoluteFocusIndex !== null && startIndexOfNode <= absoluteFocusIndex && absoluteFocusIndex <= endIndexOfNode) {
                        focusNode = node;
                        focusIndex = absoluteFocusIndex - startIndexOfNode;
                    }
                    else {
                        console.log(absoluteFocusIndex);
                    }
                    currentIndex += text ? text.length : 0;
                });
                sel.setBaseAndExtent(anchorNode, anchorIndex, focusNode, focusIndex);
            }
        }
    }
    function renderText(text) {
        keywords.forEach(keyword => {
            var _a;
            const regex = new RegExp(`^${keyword.name}\\b`, 'i');
            const keywordMatched = (_a = text.match(regex)) === null || _a === void 0 ? void 0 : _a.join('');
            text = text.replace(regex, `<span class="terminaly_keyword" style="color: ${keyword.color == 'default' ? '' : keyword.color}">${keywordMatched}</span>`);
        });
        return text;
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
//# sourceMappingURL=inputLine.js.map