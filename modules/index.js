import { starDisplay } from './stars.js'
import { appendLink } from './links.js'
import { itemCategories } from './itemCategories.js'

const main = document.querySelector('main')
const nav = document.querySelector('nav')
const heading = document.getElementById('heading')


// NAVIGATION //

function clear() {
  main.innerHTML = ''
  nav.innerHTML = ''
  heading.innerText = ''
  starDisplay.hide()
  window.scrollTo(0, 0)
}

function home() {
  clear()
  heading.innerText = 'STAR WARS Archives'
  for (const itemCategory in itemCategories) {
    const text = itemCategories[itemCategory].heading
    const clickEvent = () => fetchItems(itemCategory)
    appendLink(main, text, clickEvent, true)
  }
}


// FETCH ITEMS //

function fetchItems(itemCategory, page = 1) {
  clear()
  const url = 'https://swapi.dev/api/' + (itemCategory ? `${itemCategory}/?page=${page}` : '')
  fetch(url)
    .then(resp => resp.json())
    .then(json => {
      showItems(json.results, itemCategory)
      showPageLinks(json, page, itemCategory)
      showHomeLink()
    })
}

function showHomeLink() {
  return appendLink(nav, 'Home', () => home(), true)
}

function showItems(items, itemCategory) {
  for (const item of items) {
    const categoryData = itemCategories[itemCategory]
    heading.innerText = categoryData.heading
    const newElement = document.createElement('p')
    appendItemLink(main, item, categoryData, true)
  }
}

function appendItemLink(parent, item, categoryData, newParagraph = false) {
  const text = getName(item, categoryData)
  const clickEvent = () => fetchItem(item.url)
  return appendLink(parent, text, clickEvent, newParagraph)
}

function getName(item, categoryData) {
  const nameField = categoryData.nameField
  return item[nameField]
}

function showPageLinks(json, page, itemCategory) {
  const numberOfPages = Math.ceil(json.count / 10)
  if (numberOfPages > 1) {
    const p = document.createElement('p')
    p.innerText = `Page ${page} of ${numberOfPages}`
    nav.appendChild(p)
  }
  if (page < numberOfPages) {
    appendPageLink(nav, itemCategory, page, 1)
  }
  if (page > 1) {
    appendPageLink(nav, itemCategory, page, -1)
  }
}

function appendPageLink(parent, itemCategory, currentPage, newPage = 1) {
  const text = newPage === 1 ? 'Next' : 'Prev'
  const clickEvent = () => fetchItems(itemCategory, currentPage + newPage)
  return appendLink(parent, text, clickEvent, true)
}


// FETCH ITEM //

function fetchItem(url) {
  clear()
  url = convertToHttps(url)
  starDisplay.show(url)
  const itemCategory = getCategoryFromURL(url)
  const categoryData = itemCategories[itemCategory]
  fetch(url)
    .then(resp => resp.json())
    .then(json => {
      showItem(json, categoryData)
      showHomeLink()
    })
}

function convertToHttps(url) {
  if (url.slice(0, 4) === 'http' && url[4] !== 's') {
    return 'https' + url.slice(4)
  }
  return url
}

function getCategoryFromURL(url) {
  return url.split('/')[4]
}

function showItem(json, categoryData) {
  heading.innerText = getName(json, categoryData)
  for (const field of categoryData.fields) {
    const data = json[field]
    if (data) {
      const newElement = document.createElement('p')
      newElement.innerHTML = `<strong>${toTitle(field)}:</strong> ${displayData(json[field], field)}`
      main.appendChild(newElement)
    }
  }
}

function toTitle(string) {
  return string[0].toUpperCase() + string.slice(1).replace('_', ' ')
}

function displayData(data, field) {
  if (!Array.isArray(data)) {
    return data
  }
  const newUL = document.createElement('ol')
  newUL.className = `list-${field}`
  const ulId = `list-${field}`
  for (let url of data) {
    url = convertToHttps(url)
    const newLI = document.createElement('li')
    fetch(url)
      .then(resp => resp.json())
      .then(json => {
        const itemCategory = getCategoryFromURL(url)
        const categoryData = itemCategories[itemCategory]
        appendItemLink(newLI, json, categoryData)
        const appendToUL = document.getElementById(ulId)
        appendToUL.appendChild(newLI)
      })
  }
  return `
    <ul id="${ulId}">
      ${newUL.innerHTML}
    </ul>
  `
}

//


home()