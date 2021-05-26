import { commandKeywordInterface } from '../../types'

class Cursor {
  
  static getCurrentCursorPosition(parentElement: HTMLElement) {
    var selection = window.getSelection(),
        charCount = -1,
        isLooping,
        node;
    
    if (selection?.focusNode) {
        if (Cursor._isChildOf(selection?.focusNode, parentElement)) {
            node = selection.focusNode; 
            charCount = selection.focusOffset;
            while (node) {
              if (node === parentElement) {
                if (!isLooping) {
                  if (node.textContent !== null) {
                    charCount += node.textContent.length - 1
                  }
                }
                break;
              }
              
              if (node.previousSibling) {
                isLooping = true
                node = node.previousSibling;
                if (node.textContent !== null) {
                  charCount += node.textContent.length
                }
              } else {
                isLooping = true
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

  function handleInput(this: HTMLElement) {
    const offset = Cursor.getCurrentCursorPosition(this);
    this.textContent !== null ?
      this.innerHTML = renderText(this.textContent) : null

      Cursor.setCurrentCursorPosition(offset, this);
  }

  editor?.addEventListener('input', handleInput);
}