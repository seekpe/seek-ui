const COMPLETE = 'complete'
const CANCELED = 'canceled'

function raf (task) {
  if ('requestAnimationFrame' in window) {
    return window.requestAnimationFrame(task)
  }

  setTimeout(task, 16)
}

function setElementScroll (element, x, y) {
  Math.max(0, x)
  Math.max(0, y)

  if (element.self === element) {
    element.scrollTo(x, y)
  } else {
    element.scrollLeft = x
    element.scrollTop = y
  }
}

function getTargetScrollLocation (scrollSettings, parent) {
  const align = scrollSettings.align
  const target = scrollSettings.target
  const targetPosition = target.getBoundingClientRect()
  let parentPosition
  let x
  let y
  let differenceX
  let differenceY
  let targetWidth
  let targetHeight
  const leftAlign = align && align.left != null ? align.left : 0.5
  const topAlign = align && align.top != null ? align.top : 0.5
  const leftOffset = align && align.leftOffset != null ? align.leftOffset : 0
  const topOffset = align && align.topOffset != null ? align.topOffset : 0
  const leftScalar = leftAlign
  const topScalar = topAlign

  if (scrollSettings.isWindow(parent)) {
    targetWidth = Math.min(targetPosition.width, parent.innerWidth)
    targetHeight = Math.min(targetPosition.height, parent.innerHeight)
    x =
      targetPosition.left +
      parent.pageXOffset -
      parent.innerWidth * leftScalar +
      targetWidth * leftScalar
    y =
      targetPosition.top +
      parent.pageYOffset -
      parent.innerHeight * topScalar +
      targetHeight * topScalar
    x -= leftOffset
    y -= topOffset
    x = scrollSettings.align.lockX ? parent.pageXOffset : x
    y = scrollSettings.align.lockY ? parent.pageYOffset : y
    differenceX = x - parent.pageXOffset
    differenceY = y - parent.pageYOffset
  } else {
    targetWidth = targetPosition.width
    targetHeight = targetPosition.height
    parentPosition = parent.getBoundingClientRect()
    const offsetLeft = targetPosition.left - (parentPosition.left - parent.scrollLeft)
    const offsetTop = targetPosition.top - (parentPosition.top - parent.scrollTop)
    x = offsetLeft + targetWidth * leftScalar - parent.clientWidth * leftScalar
    y = offsetTop + targetHeight * topScalar - parent.clientHeight * topScalar
    x -= leftOffset
    y -= topOffset
    x = Math.max(Math.min(x, parent.scrollWidth - parent.clientWidth), 0)
    y = Math.max(Math.min(y, parent.scrollHeight - parent.clientHeight), 0)
    x = scrollSettings.align.lockX ? parent.scrollLeft : x
    y = scrollSettings.align.lockY ? parent.scrollTop : y
    differenceX = x - parent.scrollLeft
    differenceY = y - parent.scrollTop
  }

  return {
    x,
    y,
    differenceX,
    differenceY
  }
}

function animate (parent) {
  const scrollSettings = parent._scrollSettings

  if (!scrollSettings) {
    return
  }

  const maxSynchronousAlignments = scrollSettings.maxSynchronousAlignments

  const location = getTargetScrollLocation(scrollSettings, parent)
  const time = Date.now() - scrollSettings.startTime
  const timeValue = Math.min((1 / scrollSettings.time) * time, 1)

  if (scrollSettings.endIterations >= maxSynchronousAlignments) {
    setElementScroll(parent, location.x, location.y)
    parent._scrollSettings = null
    return scrollSettings.end(COMPLETE)
  }

  const easeValue = 1 - scrollSettings.ease(timeValue)

  setElementScroll(
    parent,
    location.x - location.differenceX * easeValue,
    location.y - location.differenceY * easeValue
  )

  if (time >= scrollSettings.time) {
    scrollSettings.endIterations++
    // Align ancestor synchronously
    scrollSettings.scrollAncestor && animate(scrollSettings.scrollAncestor)
    animate(parent)
    return
  }

  raf(animate.bind(null, parent))
}

function defaultIsWindow (target) {
  return target.self === target
}

function transitionScrollTo (target, parent, settings, scrollAncestor, callback) {
  const idle = !parent._scrollSettings
  const lastSettings = parent._scrollSettings
  const now = Date.now()
  let cancelHandler
  const passiveOptions = { passive: true }

  if (lastSettings) {
    lastSettings.end(CANCELED)
  }

  function end (endType) {
    parent._scrollSettings = null

    if (parent.parentElement && parent.parentElement._scrollSettings) {
      parent.parentElement._scrollSettings.end(endType)
    }

    if (settings.debug) {
      console.log('Scrolling ended with type', endType, 'for', parent)
    }

    callback(endType)
    if (cancelHandler) {
      parent.removeEventListener('touchstart', cancelHandler, passiveOptions)
      parent.removeEventListener('wheel', cancelHandler, passiveOptions)
    }
  }

  let maxSynchronousAlignments = settings.maxSynchronousAlignments

  if (maxSynchronousAlignments == null) {
    maxSynchronousAlignments = 3
  }

  parent._scrollSettings = {
    startTime: now,
    endIterations: 0,
    target,
    time: settings.time,
    ease: settings.ease,
    align: settings.align,
    isWindow: settings.isWindow || defaultIsWindow,
    maxSynchronousAlignments,
    end,
    scrollAncestor
  }

  if (!('cancellable' in settings) || settings.cancellable) {
    cancelHandler = end.bind(null, CANCELED)
    parent.addEventListener('touchstart', cancelHandler, passiveOptions)
    parent.addEventListener('wheel', cancelHandler, passiveOptions)
  }

  if (idle) {
    animate(parent)
  }

  return cancelHandler
}

function defaultIsScrollable (element) {
  return (
    'pageXOffset' in element ||
    ((element.scrollHeight !== element.clientHeight ||
      element.scrollWidth !== element.clientWidth) &&
      getComputedStyle(element).overflow !== 'hidden')
  )
}

function defaultValidTarget () {
  return true
}

function findParentElement (el) {
  if (el.assignedSlot) {
    return findParentElement(el.assignedSlot)
  }

  if (el.parentElement) {
    if (el.parentElement.tagName.toLowerCase() === 'body') {
      return (
        el.parentElement.ownerDocument.defaultView || el.parentElement.ownerDocument.ownerWindow
      )
    }
    return el.parentElement
  }

  if (el.getRootNode) {
    const parent = el.getRootNode()
    if (parent.nodeType === 11) {
      return parent.host
    }
  }
}

export default function scrollIntoView (target, settings, callback) {
  if (!target) {
    return
  }

  if (typeof settings === 'function') {
    callback = settings
    settings = null
  }

  if (!settings) {
    settings = {}
  }

  settings.time = isNaN(settings.time) ? 1000 : settings.time
  settings.ease =
    settings.ease ||
    function (v) {
      return 1 - Math.pow(1 - v, v / 2)
    }
  settings.align = settings.align || {}

  let parent = findParentElement(target)
  let parents = 1

  function done (endType) {
    parents--
    if (!parents) {
      callback && callback(endType)
    }
  }

  const validTarget = settings.validTarget || defaultValidTarget
  const isScrollable = settings.isScrollable

  if (settings.debug) {
    console.log('About to scroll to', target)

    if (!parent) {
      console.error('Target did not have a parent, is it mounted in the DOM?')
    }
  }

  const scrollingElements = []

  while (parent) {
    if (settings.debug) {
      console.log('Scrolling parent node', parent)
    }

    if (
      validTarget(parent, parents) &&
      (isScrollable ? isScrollable(parent, defaultIsScrollable) : defaultIsScrollable(parent))
    ) {
      parents++
      scrollingElements.push(parent)
    }

    parent = findParentElement(parent)

    if (!parent) {
      done(COMPLETE)
      break
    }
  }

  return scrollingElements.reduce(
    (cancel, parent, index) =>
      transitionScrollTo(target, parent, settings, scrollingElements[index + 1], done),
    null
  )
}
