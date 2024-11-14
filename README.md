# vue-win-box-next

Vue 3 wrapper for [WinBox.js](https://github.com/nextapps-de/winBox).

## Install

```bash
pnpm add vue-win-box-next
```

## Usage

```html
<script setup>
  import { ref } from 'vue'
  import { VueWinBoxNext } from 'vue-win-box-next'

  const count = ref(0)
  const wbRef = ref()

  //WinBox options
  const options = {
    title: 'Current count: 0',
    class: 'modern',
  }

  setInterval(() => {
    count.value++
    wbRef.value?.winBox?.setTitle(`Current count: ${count.value}`)
  }, 500)
</script>

<template>
  <VueWinBoxNext ref="wbRef" :options="options" @onmove="onMove">
    <div>Window 1: {{ count }}</div>
  </VueWinBoxNext>
</template>
```

## Methods

To update props and access methods/controls, just add a `ref` to the `VueWinBoxNext` component and use it like how you would with `WinBox.js`:

```ts
// Set the window title
wbRef.value.winBox.setTitle('New title')

// Custom Position / Size
wbRef.value.winBox.resize('50%', '50%').move('center', 'center')

// Add class
wbRef.value.winBox.addClass('modern')

// Focus a window (bring up to front)
wbRef.value.winBox.focus()

// Chaining Methods
wbRef.value.winBox
  .setTitle('Title')
  .resize('50%', '50%')
  .move('center', 'center')
  .focus()
```

To reinitialize a closed window:

```javascript
wbRef.value.winBox.initialize()
```

## Events

| Name     | Type     | Default | Description                        |
| -------- | -------- | ------- | ---------------------------------- |
| `resize` | Function | -       | Fired when the window resizes.     |
| `close`  | Function | -       | Fired when the window is closing.  |
| `focus`  | Function | -       | Fired when the window is in focus. |
| `blur`   | Function | -       | -                                  |
| `move`   | Function | -       | Fired when the window moves.       |

## Vanilla WinBox.js

```ts
import { VueWinBoxNext } from 'vue-win-box-next'

const { create, getWinBoxInst, destroy, show, hide } = VueWinBoxNext()

function generate() {
  const winBox = { create }({
    title: 'Window title',
  })
  winBox.fullscreen()
}
```

## License

MIT

## Thanks

This project fork from [wobsoriano](https://github.com/wobsoriano/vue-winbox). Thanks wobsoriano!
