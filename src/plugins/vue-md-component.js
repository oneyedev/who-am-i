import Vue from 'vue'

let x = 0
async function render(el) {
  const target = el.getAttribute('target')
  el.setAttribute('id', `vue-md-component-${x++}`)
  const id = el.getAttribute('id')
  const comp = await import(`@/components/${target}`)
  return new Vue({ components: { 'vue-md-component': comp.default } }).$mount(
    `#${id}`
  )
}

export function renderByTagName(el) {
  const els = [...el.getElementsByTagName('vue-md-component')]
  return Promise.all(els.map(render))
}

export const vueMdComponentExtension = {
  type: 'lang',
  regex: /&([^&]+)&/g,
  replace: `<vue-md-component target="$1"></vue-md-component>`
}
