class StarDisplay {
    constructor() {
        this.ratings = {}
        this.currentUrl = ''
        this.stars = []
        for (let index = 0; index < 5; index++) {
            this.stars.push(new Star(this, index))
        }
    }

    show(url) {
        if (url) {
            this.currentUrl = url
        }
        const rating = this.ratings[this.currentUrl] || 0
        for (let i = 0; i < 5; i++) {
            const star = this.stars[i]
            star.element.style.display = ''
            i < rating ? star.highlight() : star.unhighlight()
        }
    }

    hide() {
        for (const star of this.stars) {
            star.element.style.display = 'none'
          }
        this.currentUrl = ''
    }
}

class Star {
    constructor(starDisplay, index) {
        this.starDisplay = starDisplay
        this.index = index
        this.element = document.getElementById(`star${index}`)
        this.element.addEventListener('click', () => this.click())
        this.element.addEventListener('mouseover', () => this.mouseover())
        this.element.addEventListener('mouseout', () => this.mouseout())
    }

    mouseover() {
        const stars = this.starDisplay.stars
        for (let j = 0; j <= this.index; j++) {
            stars[j].highlight()
        }
    }

    mouseout() {
        this.starDisplay.show()
    }

    click() {
        this.starDisplay.ratings[starDisplay.currentUrl] = this.index + 1
        console.log(this.starDisplay.ratings)
        this.starDisplay.show()
    }

    highlight() {
        this.element.src = './images/rating-star-highlighted.png'
    }

    unhighlight() {
        this.element.src = './images/rating-star-unhighlighted.png'
    }
}

export const starDisplay = new StarDisplay()