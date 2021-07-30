# vue-winbox

Vue components inside [WinBox.js](https://github.com/nextapps-de/winbox).

// TODO: Demo

## Install

```bash
yarn add vue-winbox
```

## Usage (Vue 3)

The native [teleport](https://v3.vuejs.org/api/built-in-components.html#teleport) component is used and you can use `VueWinBox` it out-of-the-box.

```html
<template>
  <VueWinBox ref="winboxRef" :options="options" @onmove="onMove">
    <div>{{ count }}</div>
  </VueWinBox>
</template>

<script>
import { defineComponent, ref } from 'vue'
import VueWinBox from 'vue-winbox'

export default defineComponent({
  components: { VueWinBox },
  setup() {
    const count = ref(0)
    const options = {
      title: 'Current count: 0',
      class: 'modern',
    }
    const winboxRef = ref()

    setInterval(() => {
      count.value++
      winboxRef.value?.winbox?.setTitle('Current count: ' + count.value)
    }, 500)

    return {
      count,
      options,
      winboxRef,
      onMove({ id }) {
          // id is the unique id of the window
      }
    }
  }
})
</script>
```

## Usage (Vue 2)

For Vue 2, [vue-simple-portal](https://github.com/LinusBorg/vue-simple-portal) is recommended as it is the lightest portal component I've found.

First, install the component.

```bash
yarn add vue-simple-portal
```

Then import it in your `main.js` file.

```js
// main.js
import Vue from 'vue' // requires Vue >= 2.6
import VuePortal from '@linusborg/vue-simple-portal'

Vue.use(VuePortal, {
  name: 'portal', // optional, use to rename component
})
```

```html
<template>
  <VueWinBox ref="winboxRef" :options="options">
    <div>{{ count }}</div>
  </VueWinBox>
</template>
  
<script>
import { defineComponent } from 'vue'
import VueWinBox from 'vue-winbox'

export default {
  components: { VueWinBox },
  data: () => ({
      count: 0,
      options: {
          title: 'Current count: 0',
          class: 'modern'
      }
  }),
  mounted() {
    setInterval(() => {
      this.count++
      this.$refs?.winboxRef?.winbox?.setTitle('Current count: ' + this.count)
    }, 500)
  }
}
</script>
```

## Props

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`options` | Object | [Reference](https://github.com/nextapps-de/winbox#options) | WinBox options. Applied only on mount.  |
`portalComponent` | String | `portal` | Portal component name. Vue 2 only. |
`portalSelector` | String | `selector` | Portal component selector attribute. Vue 2 only.  |
`portalAttributes` | Object | `{}` | Other attributes. Vue 2 only. |

## Methods

To update props and access `WinBox` methods/controls, just add a `ref` to the `VueWinBox` component and use it like this:

```javascript
// Set the window title
this.$refs.winboxRef.winbox.setTitle('New title')

// Custom Position / Size
this.$refs.winboxRef.winbox.resize('50%', '50%').move('center', 'center')

// Add class
this.$refs.winboxRef.winbox.addClass('modern')

// Focus a window (bring up to front)
this.$refs.winboxRef.winbox.focus()

// Chaining Methods
this.$refs.winboxRef.winbox
    .setTitle('Title')
    .resize('50%', '50%')
    .move('center', 'center')
    .focus()
```

## Events

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`onresize` | Function | - | Fired when the window resizes. |
`onclose` | Function | - | Fired when the window is closing. |
`onfocus` | Function | - | Fired when the window is in focus. |
`onblur` | Function | - | - |
`onmove` | Function | - | Fired when the window moves. |

## Vanilla WinBox.js

Vue 3 users can create a new vanilla `WinBox.js` window using a composable.

```javascript
import { useWinBox } from 'vue-winbox'

export default defineComponent({
    setup() {
        const createWindow = useWinBox()

        const generate = () => {
            const winbox = createWindow({
                title: 'Window title',
                ...
            })
            winbox.fullscreen()
        }

        return {
            generate
        }
    }
})
```

Vue 2 users can create via `$WinBox` global variable.

```javascript
export default {
    methods: {
        generate() {
            const winbox = this.$WinBox({
                title: 'Window title',
                ...
            })   
            winbox.fullscreen()         
        }
    }
}
```

## Credits

- [WinBox.js](https://github.com/nextapps-de/winbox) - Modern HTML5 window manager for the web.
- [vue-demi](https://github.com/vueuse/vue-demi/) - Creates Universal Library for Vue 2 & 3

## License
MIT - Copyright (c) 2021 [Robert Soriano](https://github.com/wobsoriano)