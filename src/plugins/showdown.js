import Vue from 'vue'
import VueShowdown, { showdown } from 'vue-showdown'
import showdownHighlight from 'showdown-highlight'
import 'highlight.js/styles/github.css'
import 'github-markdown-css'

const h2LinkExtension = {
  type: 'output', // add feature to existing syntax
  regex: /<h2 id="(.+)">(.+)<\/h2>/g, // you can use html regex on 'output' type
  replace: `
<h2 id="$1">
    <a href="#$1" class="anchor" aria-hidden="true">
        <i
            class="octicon octicon-link material-icons"
        >
        link
        </i>
    </a>
    $2
</h2>
`
}
showdown.extension('showdownHighlight', showdownHighlight)
showdown.extension('h2LinkExtension', h2LinkExtension)

Vue.use(VueShowdown, {
  flavor: 'github'
})
