<script>
import { PRERENDER_KEY } from '../../config'

export default {
  components: {
    HelloWorld: () => import('../components/HelloWorld.vue')
  },
  metadata: {
    titleTemplate: '%s | Home',
    meta: [
      {
        name: 'description',
        content: 'Let us build your tools to your exact specifications',
      }, {
        name: 'keywords',
        content: 'software engineer, website design',
      },
    ],
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

<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div v-if="prerenderBuilt">Seeing this text is proof that app prerendering happened!</div>
  </div>
</template>
