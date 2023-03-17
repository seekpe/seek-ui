import scrollIntoView from './scroll-into-view'

export function getScrollToFromMenuItem (element) {
  if (!element || element.tagName.toLowerCase() !== 'a') return false

  const href = element.getAttribute('href')

  if (!href) return false

  return href.startsWith('#') && href.length > 2 ? href : false
}

export function scrollToElement ({
  element,
  topOffset,
  onComplete = () => {
    console.log('ok')
  }
}) {
  const target = document.querySelector(element)
  if (target) {
    scrollIntoView(
      target,
      {
        time: 2500,
        align: { top: 0, topOffset }
      },
      onComplete
    )
  }
}
