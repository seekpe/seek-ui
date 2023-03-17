function createStyleSheet () {
  if (typeof document !== 'undefined') {
    if (!document.getElementById('theme-style')) {
      const head = document.head || document.getElementsByTagName('head')[0]
      const style = document.createElement('style')

      style.id = 'theme-style'
      head.appendChild(style)
    }
  }
}

export default function setStyleSheetVars (obj = {}, transform = true) {
  createStyleSheet()

  if (typeof document !== 'undefined') {
    const { styleSheets } = document

    for (const styleSheet of styleSheets) {
      const node = styleSheet.ownerNode

      if (node?.id === 'theme-style') {
        let cssRules = ''

        for (let i = 0; i < styleSheet.cssRules.length; i++) {
          const cssRule = styleSheet.cssRules[i]

          if (cssRule && cssRule?.selectorText === ':root') {
            styleSheet.deleteRule(i)
          }
        }

        Object.keys(obj).forEach((key) => {
          if (transform) {
            const p = '--' + key.replace(/([A-Z])/g, '-$1').toLowerCase()
            cssRules += p + ':' + obj[key] + ';\n'
          } else {
            cssRules += key + ':' + obj[key] + ';\n'
          }
        })

        styleSheet.insertRule(`:root{${cssRules}}`)

        break
      }
    }
  }
}
