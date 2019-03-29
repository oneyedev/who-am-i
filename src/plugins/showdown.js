import Vue from 'vue'
import VueShowdown, { showdown } from 'vue-showdown'
import showdownHighlight from 'showdown-highlight'
import 'highlight.js/styles/github.css'
import 'github-markdown-css'

showdown.extension('showdownHighlight', showdownHighlight)

Vue.use(VueShowdown, {
  flavor: 'github'
})
