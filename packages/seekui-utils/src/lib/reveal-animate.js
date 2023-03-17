import ScrollMagic from 'scrollmagic'
import { $elements } from './dom'
import splitText from './split-text'

const controller = new ScrollMagic.Controller()

export default function initRevealAnimation () {
  splitText()
  $elements('[data-animation="reveal"]').forEach((container) => {
    const scene = new ScrollMagic.Scene({
      triggerElement: container,
      triggerHook: 0.8,
      reverse: false
    })
    const letters = container.querySelectorAll('.reveal-letters')
    if (letters.length) {
      scene.setClassToggle(letters, 'view-in')
    }

    scene.on('enter', () => {
      const background = container.querySelector('.background-text')
      if (background) {
        background.classList.add('view-in')
        const reverse = container.getAttribute('data-reverse')
        if (reverse) {
          container.classList.add('--reverse')
        }
      }
    })

    scene.addTo(controller)
  })
}
