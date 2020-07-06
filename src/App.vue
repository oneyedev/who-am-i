<template>
  <v-app id="app">
    <app-bar @click:nav="switchOpened"></app-bar>
    <app-menu v-model="opened"></app-menu>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppBar from '@/views/AppBar.vue'
import AppMenu from '@/views/AppMenu.vue'
@Component({
  components: {
    AppBar,
    AppMenu
  }
})
export default class App extends Vue {
  opened = false

  switchOpened() {
    this.opened = !this.opened
  }
}
</script>
<style lang="scss">
#app {
  code {
    color: unset;
  }
}
</style>

<style>
.hljs-tomorrow-comment,
pre .hljs-comment,
pre .hljs-title {
  color: #8e908c;
}

.hljs-tomorrow-red,
pre .hljs-variable,
pre .hljs-attribute,
pre .hljs-tag,
pre .hljs-regexp,
pre .hljs-ruby .hljs-constant,
pre .hljs-xml .hljs-tag .hljs-title,
pre .hljs-xml .hljs-pi,
pre .hljs-xml .hljs-doctype,
pre .hljs-html .hljs-doctype,
pre .hljs-css .hljs-id,
pre .hljs-css .hljs-class,
pre .hljs-css .hljs-pseudo {
  color: #c82829;
}

.hljs-tomorrow-orange,
pre .hljs-number,
pre .hljs-preprocessor,
pre .hljs-built_in,
pre .hljs-literal,
pre .hljs-params,
pre .hljs-constant {
  color: #f5871f;
}

.hljs-tomorrow-yellow,
pre .hljs-class,
pre .hljs-ruby .hljs-class .hljs-title,
pre .hljs-css .hljs-rules .hljs-attribute {
  color: #eab700;
}

.hljs-tomorrow-green,
pre .hljs-string,
pre .hljs-value,
pre .hljs-inheritance,
pre .hljs-header,
pre .hljs-ruby .hljs-symbol,
pre .hljs-xml .hljs-cdata {
  color: #718c00;
}

.hljs-tomorrow-aqua,
pre .hljs-css .hljs-hexcolor {
  color: #3e999f;
}

.hljs-tomorrow-blue,
pre .hljs-function,
pre .hljs-python .hljs-decorator,
pre .hljs-python .hljs-title,
pre .hljs-ruby .hljs-function .hljs-title,
pre .hljs-ruby .hljs-title .hljs-keyword,
pre .hljs-perl .hljs-sub,
pre .hljs-javascript .hljs-title,
pre .hljs-coffeescript .hljs-title {
  color: #4271ae;
}

.hljs-tomorrow-purple,
pre .hljs-keyword,
pre .hljs-javascript .hljs-function {
  color: #8959a8;
}

pre code {
  display: block;
  background: white;
  color: #4d4d4c;
  font-family: Menlo, Monaco, Consolas, monospace;
  line-height: 1hljs-5;
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
