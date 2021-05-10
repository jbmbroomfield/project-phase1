import { starDisplay } from './stars.js'

const heading = document.getElementById('heading')
const main = document.querySelector('main')
const nav = document.querySelector('nav')
const itemCategories = {
  films: {
    heading: 'Films',
    nameField: 'title',
    fields: [
      'director',
      'producer',
      'release_date',
      'opening_crawl',
      'characters',
      'planets',
      'species',
      'starships',
      'vehicles'
    ]
  },
  people: {
    heading: 'Characters',
    nameField: 'name',
    fields: [  
      'films',  
      'birth_year',
      'gender',
      'eye_color',
      'hair_color',
      'skin_color',
      'starships',
      'vehicles',
    ]
  },
  planets: {
    heading: 'Planets',
    nameField: 'name',
    fields: [    
      'films',
      'residents',
      'climate',
      'population',
      'terrain',
      'gravity',
    ]
  },
  species: {
    heading: 'Species',
    nameField: 'name',
    fields: [
      'designation',
      'classification',
      'average_height',
      'language',
      'eye_colors',
      'hair_colors',
      'skin_colors',
      'people',
      'films',
    ]
  },
  starships: {
    heading: 'Ships',
    nameField: 'name',
    fields: [
      'manufacturer',
      'starship_class',
      'model',  
      'hyperdrive_rating',
      'passengers',
      'films',
    ]
  },
  vehicles: {
    heading: 'Vehicles',
    nameField: 'name',
    fields: [  
      'manufacturer',
      'vehicle_class',
      'model',
      'crew',
      'passengers',
      'films',
    ]
  },
}



function addEventListeners(node, clickEvent) {
  node.addEventListener('click', clickEvent)
  node.addEventListener('mouseover', e => {
    node.classList.add('hover')
  })
  node.addEventListener('mouseout', e => {
    node.classList.remove('hover')
  })
}



function toTitle(string) {
  return string[0].toUpperCase() + string.slice(1).replace('_', ' ')
}

function getName(item, categoryData) {
  const nameField = categoryData.nameField
  return item[nameField]
}

function getCategoryFromURL(url) {
  return url.split('/')[4]
}

function pages(json) {
  return Math.ceil(json.count / 10)
}

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
    const categoryData = itemCategories[itemCategory]
    const p = document.createElement('p')
    const span = document.createElement('span')
    span.classList.add('link')
    span.innerText = categoryData.heading
    addEventListeners(span, e => {
      showItems(itemCategory)
    })
    p.appendChild(span)
    main.appendChild(p)
  }
}

function itemLink(item, categoryData) {
  const span = document.createElement('span')
  span.innerText = getName(item, categoryData)
  span.classList.add('link')
  addEventListeners(span, e => {
    showItem(item.url)
  })
  return span
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
      newLI.appendChild(itemLink(json, categoryData))
      const appendToUL = document.getElementById(ulId)
      appendToUL.appendChild(newLI)
      // return json
    })
  }
  return `
    <ul id="${ulId}">
      ${newUL.innerHTML}
    </ul>
  `
}

function showItems(itemCategory, page = 1) {
  clear()
  const url = 'https://swapi.dev/api/' + (itemCategory ? `${itemCategory}/?page=${page}` : '')
  fetch(url)
  .then(resp => resp.json())
  .then(json => {
    for (const item of json.results) {
      const categoryData = itemCategories[itemCategory]
      heading.innerText = categoryData.heading
      const newElement = document.createElement('p')
      newElement.appendChild(itemLink(item, categoryData))
      main.appendChild(newElement)
    }
    const numberOfPages = pages(json)
    if (numberOfPages > 1) {
      const p = document.createElement('p')
      p.innerText = `Page ${page} of ${pages(json)}`
      nav.appendChild(p)
    }
    if (page < pages(json)) {
      nav.appendChild(pageLink(itemCategory, page, 1))
    }
    if (page > 1) {
      nav.appendChild(pageLink(itemCategory, page, -1))
    }
    nav.appendChild(homeLink())
  })
}

function convertToHttps(url) {
  if (url.slice(0, 4) === 'http' && url[4] !== 's') {
    return 'https' + url.slice(4)
  }
  return url
}

function showItem(url) {
  url = convertToHttps(url)
  clear()
  starDisplay.show(url)
  const itemCategory = getCategoryFromURL(url)
  const categoryData = itemCategories[itemCategory]
  fetch(url)
  .then(resp => resp.json())
  .then(json => {
    heading.innerText = getName(json, categoryData)
    for (const field of categoryData.fields) {
      const data = json[field]
      if (data) {
        const newElement = document.createElement('p')
        newElement.innerHTML = `<strong>${toTitle(field)}:</strong> ${displayData(json[field], field)}`
        main.appendChild(newElement)
      }
    }
    nav.appendChild(homeLink())
  })
}

function homeLink() {
  const p = document.createElement('p')
  const span = document.createElement('span')
  span.classList.add('link')
  span.innerText = 'Home'
  addEventListeners(span, e => {
    home()
  })
  p.appendChild(span)
  return p
}

function pageLink(itemCategory, currentPage, newPage = 1) {
  const p = document.createElement('p')
  const span = document.createElement('span')
  span.classList.add('link')
  span.innerText = newPage === 1 ? 'Next' : 'Prev'
  addEventListeners(span, e => {
    showItems(itemCategory, currentPage + newPage)
  })
  p.appendChild(span)
  return p
}

home()
