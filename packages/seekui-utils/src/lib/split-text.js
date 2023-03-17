import { $elements } from './dom'

export default function splitText (el = '.reveal-letters') {
  let counter = 0
  const elements = [...$elements(el)]

  elements.forEach(setupRevealTextEffect)

  function setupRevealTextEffect (el) {
    wrapWordsAndLetters(el)
  }

  function wrapWordsAndLetters (el) {
    if (el) {
      const wordsAndLetters = convertStringToWordsAndLetters(`${el.innerHTML}`)
      const wrapper = makeWrapper(wordsAndLetters)
      replaceElementText(el, wrapper)
    }
  }

  function convertStringToWordsAndLetters (str) {
    const splitStr = str.trim().split(/(<\/?[^>]+>)/)
    const filteredStr = splitStr.filter((text) => text !== '')
    const totalStr = filteredStr.length

    return filteredStr.map((text, i) => {
      if (text.match(/<\/?[^>]+>/)) {
        return text
      }

      const indexStr = i + 1
      const splitText = text.trim().split(' ')
      const totalSplitText = splitText.length

      return splitText.map((word, key) => {
        const indexWord = key + 1
        // Add a space if it's not the last word
        if (indexStr === totalStr && indexWord === totalSplitText) {
          return word.split('')
        }

        return word.split('').concat(['&nbsp;'])
      })
    })
  }

  function makeWrapper (wordsAndLetters) {
    return wordsAndLetters.map((text) => {
      if (Array.isArray(text)) {
        return text.reduce(appendWord, '')
      }
      return text
    })
  }

  function appendWord (el, text) {
    const textChild = makeWord(text)
    return `${el}${textChild}`
  }

  function makeWord (word) {
    const wordChild = word.reduce(appendLetter, '')
    return `<span aria-label="word">${wordChild}</span>`
  }

  function appendLetter (el, letter) {
    const letterChild = makeLetter(letter)
    return `${el}${letterChild}`
  }

  function makeLetter (letter) {
    counter++
    return `<span class="c-${counter}" aria-label="wrapper"><span aria-label="letter">${letter}</span></span>`
  }

  function replaceElementText (el, wrapper) {
    el.textContent = ''
    el.innerHTML = wrapper.join('')
    counter = 0
  }
}
