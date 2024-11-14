import type { Params } from 'winbox'
import type { VNode } from 'vue'

export interface Options extends Params {
  component?: (() => VNode) | string | (() => JSX.Element)
  oncreate?: ((this: WinBox, options: Options) => void) | undefined
  onfullscreen?: ((this: WinBox) => void) | undefined
  onminimize?: ((this: WinBox) => void) | undefined
  onmaximize?: ((this: WinBox) => void) | undefined
  onrestore?: ((this: WinBox) => void) | undefined
}
