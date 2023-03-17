import setStyleSheetVars from './styleSheetVars'

export const getScreenAspectRatioRect = () => ({
  width: window.innerHeight * (16 / 9),
  height: window.innerWidth / (16 / 9)
})

export const setScreenAspectRatioRect = () => {
  const { width, height } = getScreenAspectRatioRect()
  const ww = window.innerWidth
  const wh = window.innerHeight
  const rotation = ww < wh ? 'vertical' : 'horizontal'

  setStyleSheetVars({
    'asp-width': `${width}px`,
    'asp-height': `${height}px`,
    ww: `${ww}px`,
    wh: `${wh}px`,
    direction: rotation
  })
}
