import Vue from 'vue'
import VueShowdown, { showdown } from 'vue-showdown'
import showdownHighlight from 'showdown-highlight'
import 'highlight.js/styles/github.css'
import 'github-markdown-css'

const linkExtension = {
  type: 'output', // add feature to existing syntax
  regex: /<(h[1|2|3]) id="(.+)">(.+)<\/h[1|2|3]>/g, // you can use html regex on 'output' type
  replace: `
<$1 id="$2">
    <a onclick="onClickArticleAnchor('#$2')" class="anchor" aria-hidden="true">
        <i
          aria-hidden="true"
          class="v-icon mdi mdi-link theme--light"
        >
        </i>
    </a>
    $3
</$1>
`
}
showdown.extension('showdownHighlight', showdownHighlight)
showdown.extension('linkExtension', linkExtension)

Vue.use(VueShowdown, {
  flavor: 'github'
})
