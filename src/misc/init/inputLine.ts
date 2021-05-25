import { commandKeywordInterface } from '../../types'

class Cursor {
  
  static getCurrentCursorPosition(parentElement: HTMLElement) {
      var selection = window.getSelection(),
          charCount = -1,
          node;
      
      if (selection?.focusNode) {
          if (Cursor._isChildOf(selection?.focusNode, parentElement)) {
              node = selection.focusNode; 
              charCount = selection.focusOffset;
              
              while (node) {
                if (node === parentElement) {

                  break;
                }
                
                if (node.previousSibling) {
                  node = node.previousSibling;
                  if (node.textContent !== null) {
                    charCount += node.textContent.length
                  }
                } else {
                    node = node.parentNode;
                    if (node === null) {
                      break;
                    }
                }
              }
          }
      } 
      
      return charCount;
  }
  
  static setCurrentCursorPosition(chars: number, element: Element) {
    if (chars >= 0) {
      var selection = window.getSelection();
      
      let range = Cursor._createRange(element, { count: chars });

      if (range) {
        range.collapse(false);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
  }
  
  static _createRange(node: Node, chars: { count: number }, range?: Range): Range {
      if (!range) {
        range = document.createRange()
        range.selectNode(node);
        range.setStart(node, 0);
      }

      if (chars.count === 0) {
        range.setEnd(node, chars.count);
      } else if (node && chars.count >0) {
        if (node.nodeType === Node.TEXT_NODE) {
          if (node.textContent !== null && node.textContent.length < chars.count) {
            chars.count -= node.textContent.length;
          } else {
            range.setEnd(node, chars.count);
            chars.count = 0;
          }
        } else {
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
  
  static _isChildOf(node: Node, parentElement: Element) {
    while (node !== null) {
      if (node === parentElement) {
        return true;
      }
      node.parentNode ? node = node.parentNode : null;
    }

    return false;
  }
}

export default function(keywords: commandKeywordInterface[], id: string) {
  const editor = document.getElementById(`terminaly_field_${id}`);
  
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

          console.log(
            startIndexOfNode,
            absoluteAnchorIndex,
            endIndexOfNode
          );

          if (startIndexOfNode <= absoluteAnchorIndex && absoluteAnchorIndex <= endIndexOfNode) {
            anchorNode = node;
            anchorIndex = absoluteAnchorIndex - startIndexOfNode;
          }

          if (startIndexOfNode <= absoluteFocusIndex && absoluteFocusIndex <= endIndexOfNode) {
            focusNode = node;
            focusIndex = absoluteFocusIndex - startIndexOfNode;
          }

          currentIndex += text ? text.length : 0
        });
        sel.setBaseAndExtent(anchorNode, anchorIndex, focusNode, focusIndex);
      }
    }
  }
  
  function renderText(text: string) {

    keywords.forEach(keyword => {
      const regex = new RegExp(`^${keyword.name}\\b`, 'i');
      const keywordMatched = text.match(regex)?.join('');
      text = text.replace(regex,
        `<span class="terminaly_keyword" style="color: ${keyword.color == 'default' ? '' : keyword.color}">${keywordMatched}</span>`
      );
    })

    return text
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

  function handleInput(this: HTMLElement) {
    
    let offset = Cursor.getCurrentCursorPosition(this);
    this.textContent !== null ?
      this.innerHTML = renderText(this.textContent) : null
    Cursor.setCurrentCursorPosition(offset, this);
    this.focus();
  }

  editor?.addEventListener('input', handleInput);
}