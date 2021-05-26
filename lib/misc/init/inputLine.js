class Cursor {
    static getCurrentCursorPosition(parentElement) {
        var selection = window.getSelection(), charCount = -1, isLooping, node;
        if (selection === null || selection === void 0 ? void 0 : selection.focusNode) {
            if (Cursor._isChildOf(selection === null || selection === void 0 ? void 0 : selection.focusNode, parentElement)) {
                node = selection.focusNode;
                charCount = selection.focusOffset;
                while (node) {
                    if (node === parentElement) {
                        if (!isLooping) {
                            if (node.textContent !== null) {
                                charCount += node.textContent.length - 1;
                            }
                        }
                        break;
                    }
                    if (node.previousSibling) {
                        isLooping = true;
                        node = node.previousSibling;
                        if (node.textContent !== null) {
                            charCount += node.textContent.length;
                        }
                    }
                    else {
                        isLooping = true;
                        node = node.parentNode;
                        if (node === null) {
                            break;
                        }
                    }
                }
            }
        }
        console.log(charCount);
        return charCount;
    }
    static setCurrentCursorPosition(chars, element) {
        if (chars >= 0) {
            var selection = window.getSelection();
            let range = Cursor._createRange(element, { count: chars });
            if (range) {
                range.collapse(false);
                selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
                selection === null || selection === void 0 ? void 0 : selection.addRange(range);
            }
        }
    }
    static _createRange(node, chars, range) {
        if (!range) {
            range = document.createRange();
            range.selectNode(node);
            range.setStart(node, 0);
        }
        if (chars.count === 0) {
            range.setEnd(node, chars.count);
        }
        else if (node && chars.count > 0) {
            if (node.nodeType === Node.TEXT_NODE) {
                if (node.textContent !== null && node.textContent.length < chars.count) {
                    chars.count -= node.textContent.length;
                }
                else {
                    range.setEnd(node, chars.count);
                    chars.count = 0;
                }
            }
            else {
                for (var lp = 0; lp < node.childNodes.length; lp++) {
                    range = Cursor._createRange(node.childNodes[lp], chars, range);
                    if (chars.count === 0) {
                        break;
                    }
                }
            }
        }
        return range;
    }
    static _isChildOf(node, parentElement) {
        while (node !== null) {
            if (node === parentElement) {
                return true;
            }
            node.parentNode ? node = node.parentNode : null;
        }
        return false;
    }
}
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
                    if (startIndexOfNode <= absoluteAnchorIndex && absoluteAnchorIndex <= endIndexOfNode) {
                        anchorNode = node;
                        anchorIndex = absoluteAnchorIndex - startIndexOfNode;
                    }
                    if (startIndexOfNode <= absoluteFocusIndex && absoluteFocusIndex <= endIndexOfNode) {
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
                let anchorIndex = 0;
                let focusIndex = 0;
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
    function handleInput() {
        const offset = Cursor.getCurrentCursorPosition(this);
        this.textContent !== null ?
            this.innerHTML = renderText(this.textContent) : null;
        Cursor.setCurrentCursorPosition(offset, this);
    }
    editor === null || editor === void 0 ? void 0 : editor.addEventListener('input', handleInput);
}
//# sourceMappingURL=inputLine.js.map