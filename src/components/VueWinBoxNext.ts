import type { Component, PropType } from 'vue'
import {
  Teleport,
  defineComponent,
  h,
  onMounted,
  onScopeDispose,
  ref,
  shallowRef,
  toRaw,
} from 'vue'
import { nanoid } from 'nanoid'

import type { Options } from '../types'

declare const WinBox: WinBox.WinBoxConstructor

export const VueWinBoxNext = defineComponent({
  props: {
    options: {
      type: Object as PropType<Partial<Options>>,
      required: true,
    },
    openOnMount: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['move', 'resize', 'close', 'focus', 'blur'],
  setup(props, { slots, emit, expose }) {
    const selector = `vue-win-box-${nanoid()}`
    const winBox = shallowRef<WinBox | null>(null)
    const initialized = ref(false)

    expose({
      selector,
      winBox,
      initialized,
      initialize,
    })

    function initialize() {
      if (initialized.value) {
        console.error('Please close the window first before reinitializing.')
        return
      }

      winBox.value = new WinBox({
        onresize: (width: number, height: number) => {
          emit('resize', {
            id: winBox.value?.id,
            width,
            height,
          })
        },
        onclose: () => {
          emit('close', { id: winBox.value?.id })
          initialized.value = false
          winBox.value = null
          return false
        },
        onfocus: () => {
          emit('focus', { id: winBox.value?.id })
        },
        onblur: () => {
          emit('blur', { id: winBox.value?.id })
        },
        onmove: (x: number, y: number) => {
          emit('move', {
            id: winBox.value?.id,
            x,
            y,
          })
        },
        ...props.options,
        id: selector,
      })
      initialized.value = true
    }

    onMounted(() => {
      if (!props.openOnMount)
        return

      initialize()
    })

    onScopeDispose(() => {
      toRaw(winBox.value)?.close()
    })

    return () =>
      initialized.value
        ? h(
          Teleport as unknown as Component,
          {
            to: `#${selector} .wb-body`,
          },
          slots.default?.(),
        )
        : null
  },
})
