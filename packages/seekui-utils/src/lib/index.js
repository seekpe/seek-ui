export const $element = (selector) => document.querySelector(selector)

export const $elements = (selector) => document.querySelectorAll(selector)

// Check if window loaded
export const isWindowLoaded = () => window.document.readyState === 'complete'

/**
 * Validate string or number if it is empty
 * @param {*} val
 * @returns {boolean}
 */
export const isEmpty = (val) => {
  if (typeof val === 'string') {
    return val.trim().length === 0
  }

  if (typeof val === 'number') {
    return val === 0
  }

  return true
}

export const renderCustom = (swiper, current, total) => {
  return `
      <span class="current">${current}</span>
        <div></div>
      <span>${total}</span>
    `
}

export const customPagination = ({ element }) => {
  if (!element) {
    return
  }
  return {
    el: `${element} .swiper-navigation__pagination`,
    clickable: true,
    type: 'custom',
    renderCustom (swiper, current, total) {
      return renderCustom(swiper, current, total)
    }
  }
}

export const customNavigation = ({ element }) => {
  if (!element) {
    return
  }
  return {
    nextEl: `${element} .swiper-navigation__next`,
    prevEl: `${element} .swiper-navigation__prev`
  }
}

export const leftPadZero = (value) => {
  return value < 10 ? `0${value}` : value.toString()
}

export const esMonths = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre'
]
