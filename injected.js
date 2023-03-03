getText();

function getText() {
  let text = "";
  let isUser = true
  
  const rootNode = document.querySelector('div.text-sm');

  for (const node of rootNode.childNodes) {
    const parentDiv = node.querySelector('div.items-start');

    if (parentDiv !== null) {
      text += isUser ? "USER:\n" : "AI:\n" 
      isUser = !isUser;

      if ( parentDiv.childNodes[0].hasChildNodes()){
        text += extractDivText(parentDiv.childNodes[0])
      } else {
        text += parentDiv.innerText;
      }

      text += "\n\n";
    }
  }
  
  // console.log(text);
  
  return text;
}

function extractDivText(div) {
  // Initialize the output string
  let output = '';

  // Iterate over the child nodes of the div
  for (const node of div.childNodes) {
    // Check the node type
    if (node.nodeType === Node.ELEMENT_NODE) {
      // If the node is an element, check the tag name
      switch (node.tagName) {
        case 'P':
          // If the tag is a <p> tag, add the text to the output string
          output += node.textContent;
          break;
        case 'UL':
        case 'OL':
          // If the tag is a <ul> or <ol> tag, iterate over its child <li> elements
          output += '\n';
          for (const li of node.querySelectorAll('li')) {
            // Add the text of each <li> element to the output string
            output += '- ' + li.textContent + '\n';
          }
          break;
        case 'PRE':
          // If the tag is a <pre> tag, add the code inside it to the output string
         
          // break the textblock into an array of lines          
          let codeLines = node.innerText.split('\n')
          // remove first line ('copy code'), starting at the first position          
          codeLines.splice(0,1);
          // join the array back into a single string
          let formattedCode = codeLines.join('\n');
          formattedCode = "\nCODE BLOCK START\n" + formattedCode + "CODE BLOCK END\n";

          output += formattedCode;
          break;
      }
    }
  }

  // Log the output string
  return output;
}