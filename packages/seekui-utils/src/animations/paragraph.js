import Animation from '../clasess/Animation'
import { CSS } from '../lib/easings'
import { calculate, split } from '../lib/text'
import each from 'lodash/each'

export default class Paragraph extends Animation {
  constructor({ element }) {
    const lines = []
    const paragraphs = element.querySelectorAll('h1, h2, h3 p')

    if (paragraphs.length !== 0) {
      each(paragraphs, (element) => {
        split({ element })
        split({ element })
        lines.push(...element.querySelectorAll('span span'))
      })
    } else {
      split({ element })
      split({ element })

      lines.push(...element.querySelectorAll('span span'))
    }

    super({
      element,
      elements: {
        lines
      }
    })

    this.onResize()

    if ('IntersectionObserver' in window) {
      this.animateOut()
    }
  }

  animateIn() {
    super.animateIn()

    each(this.lines, (line, lineIndex) => {
      each(line, (word) => {
        word.parentNode.setAttribute('aria-label', 'word')
        word.setAttribute('aria-label', 'letter')
        word.style.transition = `transform 1.5s ${lineIndex * 0.1}s ${CSS}`
        word.style[this.transformPrefix] = 'translate3d(0, 0, 0)' // translateY(0)
      })
    })
  }

  animateOut() {
    super.animateOut()

    each(this.lines, (line) => {
      each(line, (word) => {
        word.style[this.transformPrefix] = 'translate3d(0, 100%, 0)' // translateY(100%)
      })
    })
  }

  onResize() {
    this.lines = calculate(this.elements.lines)
  }
}
