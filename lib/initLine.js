"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const public_ip_1 = __importDefault(require("public-ip"));
exports.default = (setIP) => {
    const keywords = ["CD", "LS", "PWD", "MKDIR"];
    const editor = document.getElementById('terminaly_field');
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
                    text ? currentIndex += text.length : null;
                });
                sel.setBaseAndExtent(anchorNode, anchorIndex, focusNode, focusIndex);
            }
        }
    }
    function renderText(text) {
        const words = text.split(/(\s+)/);
        const output = words.map((word) => {
            return keywords.includes(word.toUpperCase()) ?
                `<span class="terminaly_keyword">${word}</span>`
                : word;
        });
        return output.join('');
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
    editor === null || editor === void 0 ? void 0 : editor.addEventListener('input', updateEditor);
    (() => __awaiter(void 0, void 0, void 0, function* () { try {
        setIP(yield public_ip_1.default.v4());
    }
    catch (_a) { } }))();
};
//# sourceMappingURL=initLine.js.map