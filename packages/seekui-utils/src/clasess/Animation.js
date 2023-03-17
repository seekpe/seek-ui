import AutoBind from 'auto-bind'
import Prefix from 'prefix'

export default class Animation {
  constructor({ element, elements }) {
    AutoBind(this)

    const { animationDelay, animationTarget } = element.dataset

    this.delay = animationDelay

    this.element = element
    this.elements = elements

    this.target = animationTarget ? element.closest(animationTarget) : element
    this.transformPrefix = Prefix('transform')

    this.isVisible = false

    if ('IntersectionObserver' in window) {
      this.createObserver()

      this.animateOut()
    } else {
      this.animateIn()
    }
  }

  createObserver() {
    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        const target = entry.target
        const { animated } = entry.target.dataset
        if (!animated) {
          if (!this.isVisible && entry.isIntersecting) {
            this.animateIn()
            target.setAttribute('data-animated', 'true')
            observer.unobserve(target)
          } else {
            this.animateOut()
          }
        }
      })
    }

    this.observer = new window.IntersectionObserver(observerCallback).observe(this.target)
  }

  animateIn() {
    this.isVisible = true
  }

  animateOut() {
    this.isVisible = false
  }
}
