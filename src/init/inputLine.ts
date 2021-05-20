export default function() {
  const keywords = ["CD", "LS", "PWD", "MKDIR"];
  const editor = document.getElementById('terminaly_field');
  
  function getTextSegments(element: HTMLElement | ChildNode): Array<{text: string | null, node: ChildNode}> {
    const textSegments: Array<{text: string | null, node: ChildNode}> = [];
    Array.from(element.childNodes).forEach((node) => {
      switch(node.nodeType) {
        case Node.TEXT_NODE:
          textSegments.push({text: node.nodeValue, node});
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
    
  function restoreSelection(absoluteAnchorIndex: number, absoluteFocusIndex: number) {
    if (editor) {
      const sel = window.getSelection();
      if (sel) {
        const textSegments = getTextSegments(editor);
        let anchorNode: HTMLElement | ChildNode = editor;
        let anchorIndex = 0;
        let focusNode: HTMLElement | ChildNode = editor;
        let focusIndex = 0;
        let currentIndex = 0;
        textSegments.forEach(({text, node}) => {
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
        sel.setBaseAndExtent(anchorNode,anchorIndex,focusNode,focusIndex);
      }
    }
  }
  
  function renderText(text: string) {
    const words = text.split(/(\s+)/);
    const output = words.map((word) => {
      return keywords.includes(word.toUpperCase()) ? 
        `<span class="terminaly_keyword">${word}</span>`
        : word
    })
    return output.join('');
  }

  function updateEditor() {
    if (editor) {
      const sel = window.getSelection();
      if (sel) {
        const textSegments = getTextSegments(editor);
        const textContent = textSegments.map(({text}) => text).join('');
        let anchorIndex = 0;
        let focusIndex = 0;
        let currentIndex = 0;
        textSegments.forEach(({text, node}) => {
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

  editor?.addEventListener('input', updateEditor);
}