export function copyLinks (element = '.copyLink') {
  const copyLinks = document.querySelectorAll(element)
  let copyLinkItem
  let copiedLink
  for (let i = 0, len = copyLinks.length; i < len; i++) {
    copyLinkItem = copyLinks[i]
    copyLinkItem.onclick = function (e) {
      e.preventDefault()
      copiedLink = this.getAttribute('href')
      navigator.clipboard.writeText(copiedLink)
      alert('Enlace copiado: ' + copiedLink)
    }
  }
}

export function equalHeight (resize, selector) {
  const elements = document.querySelectorAll(selector)
  const allHeights = []
  let i = 0
  if (resize === true) {
    for (i = 0; i < elements.length; i++) {
      elements[i].style.height = 'auto'
    }
  }
  for (i = 0; i < elements.length; i++) {
    const elementHeight = elements[i].clientHeight
    allHeights.push(elementHeight)
  }
  for (i = 0; i < elements.length; i++) {
    elements[i].style.height = Math.max.apply(Math, allHeights) + 'px'
  }
}

export function findGetParameter (parameterName) {
  let result = null
  let tmp = []
  location.search
    .substring(1)
    .split('&')
    .forEach(function (item) {
      tmp = item.split('=')
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1])
    })
  return result
}

export function searchTitles (cpt) {
  const themeSettings = JSON.parse(document.getElementById('themeSettings').innerHTML)
  let ajax_request
  $('.search_titles').keyup(function () {
    const currentInput = $(this)
    const keyword = currentInput.val()
    if (keyword.length >= 3) {
      if (typeof ajax_request !== 'undefined') {
        ajax_request.abort()
      }
      ajax_request = $.ajax({
        url: themeSettings.ajaxUrl,
        type: 'post',
        data: {
          action: 'titles_fetch',
          keyword: currentInput.val(),
          cpt: cpt
        },
        success: function (data) {
          $('#titlesfetch').html(data)
        }
      })
    } else {
      $('#titlesfetch').html('')
    }
  })
}
