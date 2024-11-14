import {
  Teleport,
  createVNode,
  getCurrentScope,
  onScopeDispose,
  render,
  shallowRef,
} from 'vue'
import { nanoid } from 'nanoid'

import type { Options } from '../types'

declare const WinBox: WinBox.WinBoxConstructor

export function useWinBoxNext() {
  const winBox = shallowRef<WinBox | null>(null)
  const selector = `vue-win-box-${nanoid()}`

  const create = (options: Options): WinBox => {
    if (winBox.value) {
      console.error(
        'Please close the window first before reinitializing.',
      )

      return winBox.value
    }

    const { component, ...rest } = options

    winBox.value = new WinBox({
      ...rest,
      id: selector,
    })

    const t = createVNode(
      Teleport,
      {
        to: `#${selector} .wb-body`,
      },
      [createVNode(component ?? createVNode('div'), null, null)],
    )

    const mountElement = document.getElementById(selector)

    if (mountElement)
      render(t, mountElement)

    return winBox.value
  }

  const destroy = () => {
    winBox.value?.unmount()
    winBox.value = null
  }

  const show = () => {
    winBox.value?.show()
  }

  const hide = () => {
    winBox.value?.hide()
  }

  const getWinBoxInst = () => winBox.value

  if (getCurrentScope()) {
    onScopeDispose(() => {
      destroy()
    })
  }

  return {
    create,
    getWinBoxInst,
    destroy,
    show,
    hide,
  }
}
