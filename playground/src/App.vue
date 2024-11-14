<script setup lang="tsx">
import { ref } from 'vue'
import { VueWinBoxNext, useWinBoxNext } from 'vue-win-box-next'
import Counter from './Counter.vue'

const options = {
  title: 'Count: 0',
  class: 'modern',
  x: 'center',
  y: 'center',
  width: '50%',
  height: '50%',
}
const winBoxRef = ref()
const isOpen = ref(true)
const { create } = useWinBoxNext()

function setTitle(count: number) {
  winBoxRef.value?.winBox?.setTitle(`Count: ${count}`)
}

// TODO: Check winBox status before resizing
// const handleResize = () => {
//   winBoxRef.value?.winBox?.resize("50%", "50%").move("center", "center")
// }

// onMounted(() => {
//   window.addEventListener('resize', handleResize)
// })

// onUnmounted(() => {
//   window.removeEventListener('resize', handleResize)
// })

function initialize() {
  winBoxRef.value?.initialize()
}

function openUrl() {
  const randomId = Math.floor(Math.random() * 20) + 1
  const wb = create({
    ...options,
    title: `Fox #${randomId}`,
    class: 'modern',
    component: () => <Counter onUpdate:count={setTitle} />,
  })

  wb.fullscreen()
}
const visible = ref(false)
</script>

<template>
  <VueWinBoxNext
    ref="winBoxRef"
    :options="options"
    @focus="isOpen = true"
    @close="isOpen = false"
  >
    <Counter @update:count="setTitle" />
  </VueWinBoxNext>

  <div v-if="visible">
    <VueWinBoxNext
      :options="{
        title: `Fox #1`,
        url: `https://randomfox.ca/images/1.jpg`,
        class: 'modern',
      }"
      open-on-mount
      @close="visible = false"
    />
  </div>

  <div class="container">
    <div v-show="!isOpen" class="button" @click="initialize">
      Open Vue component
    </div>
    <div class="button" style="margin-top: 10px" @click="openUrl">
      Open Random URL
    </div>

    <div
      v-show="!visible"
      class="button"
      style="margin-top: 10px"
      @click="() => (visible = true)"
    >
      Parent Dom Visible
    </div>
    <div
      v-show="visible"
      class="button"
      style="margin-top: 10px"
      @click="() => (visible = false)"
    >
      Parent Dom Hidden
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, Helvetica, Arial, 'Open Sans',
    OpenSans, Roboto, Segoe UI, sans-serif;
  background: linear-gradient(135deg, #0d1117, #131820);
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.button {
  padding: 5px 10px;
  margin-bottom: 5px;
  display: inline-block;
  background-color: #ca00b4;
  color: #fff;
  width: auto;
  border-radius: 10px;
  padding: 15px 25px;
  cursor: pointer;
}
</style>
