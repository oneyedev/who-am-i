import Vue from 'vue'

let x = 0
async function render(el) {
  const target = el.getAttribute('target')
  let option = {}
  if (target) {
    const comp = await import(`@/components/${target}`)
    option.components = { 'vue-md-component': comp.default }
  }
  const dataAttr = el.getAttribute('data')
  if (dataAttr) {
    option.data = { data: new Function(dataAttr)() }
  }
  option.template = `<component is="vue-md-component" v-bind="data"></component>`
  const id = `vue-md-component-${x++}`
  el.setAttribute('id', id)
  return new Vue(option).$mount(`#${id}`)
}

export function renderByTagName(el) {
  const els = [...el.getElementsByTagName('vue-md-component')]
  return Promise.all(els.map(render))
}

export const vueMdComponentExtension = {
  type: 'lang',
  regex: /&([^&]+)&/g,
  replace: `<vue-md-component target="$1" data="$2"></vue-md-component>`
}
