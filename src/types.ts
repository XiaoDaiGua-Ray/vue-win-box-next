import type { Params } from 'winbox'
import type { VNode } from 'vue'

export interface Options extends Params {
  background?: string | undefined
  body?: HTMLElement | undefined
  border?: string | number | undefined
  bottom?: string | number | undefined
  class?: string | string[] | undefined
  height?: string | number | undefined
  html?: string | undefined
  id?: string | number | undefined
  index?: number | undefined
  left?: string | number | undefined
  max?: boolean | undefined
  minheight?: string | number | undefined
  minwidth?: string | number | undefined
  modal?: boolean | undefined
  mount?: Node | undefined
  right?: string | number | undefined
  root?: Node | undefined
  splitscreen?: boolean | undefined
  title?: string | undefined
  top?: string | number | undefined
  url?: string | undefined
  width?: string | number | undefined
  x?: 'right' | 'center' | string | number | undefined
  y?: 'bottom' | 'center' | string | number | undefined
  component?: (() => VNode) | string | (() => JSX.Element)
  oncreate?: ((this: WinBox, options: Options) => void) | undefined
  onfullscreen?: ((this: WinBox) => void) | undefined
  onminimize?: ((this: WinBox) => void) | undefined
  onmaximize?: ((this: WinBox) => void) | undefined
  onrestore?: ((this: WinBox) => void) | undefined
  onclose?: ((this: WinBox, force?: boolean) => boolean) | undefined
  onfocus?: ((this: WinBox) => void) | undefined
  onblur?: ((this: WinBox) => void) | undefined
  onresize?: ((this: WinBox, width: number, height: number) => void) | undefined
  onmove?: ((this: WinBox, x: number, y: number) => void) | undefined
}
