<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div v-if="prerenderBuilt">Seeing this text is proof that app prerendering happened!</div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { PRERENDER_KEY } from '../../config'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data: () => ({
    prerenderBuilt: false,
  }),
  created () {
    if (window[PRERENDER_KEY]) {
      this.prerenderBuilt = true
    }
  }
}
</script>
