function addEventListeners(node, clickEvent) {
  node.addEventListener('click', clickEvent)
  node.addEventListener('mouseover', () => node.classList.add('hover'))
  node.addEventListener('mouseout', () => node.classList.remove('hover'))
}

export function appendLink(parent, text, clickEvent, newParagraph = false) {
  const span = document.createElement('span')
  span.innerText = text
  span.classList.add('link')
  addEventListeners(span, clickEvent)
  if (!newParagraph) {
    parent.appendChild(span)
    return span
  }
  const p = document.createElement('p')
  p.appendChild(span)
  parent.appendChild(p)
  return p
}


