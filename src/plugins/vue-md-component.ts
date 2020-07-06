import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import vuetify from './vuetify'
const requireComponent = require.context(
  // 컴포넌트들이 있는 폴더
  './../components/base',
  // 하위 폴더까지 포함할 지 여부
  false,
  // 기본 컴포넌트를 찾는데 사용할 정규표현식
  /[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // 컴포넌트 설정 가져오기
  const componentConfig = requireComponent(fileName)

  // 컴포넌트의 파스칼표기법 이름 가져오기
  const componentName = upperFirst(
    camelCase(
      // 파일이름 앞의 `./` 등 파스칼표기법 이름에 들어갈 필요없는
      // 기호들을 제거
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
    )
  )

  // 컴포넌트를 전역적으로 등록
  Vue.component(
    componentName,
    // `export default`를 이용한 컴포넌트는 `.default`로 컴포넌트
    // 옵션을 추출하고 그렇지 않은 컴포넌트는 모듈의 루트를 호출
    componentConfig.default || componentConfig
  )
})

export function renderByTagName(el: Element) {
  try {
    const vm = new Vue({ template: el.outerHTML, vuetify })
    vm.$mount(el)
    return Promise.resolve(vm)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const vueMdComponentExtension = {
  type: 'lang',
  regex: /&([^&]+)&/g,
  replace: `<vue-md-component target="$1" data="$2"></vue-md-component>`
}

export async function renderByRuntime(
  el: Element,
  { template, script }: { template: string; script: string }
) {
  try {
    const replaced = script.replace('export default', 'return')
    const option = new Function(replaced)()
    option.template = template
    const vm = new Vue(option)
    vm.$mount(el)
    return Promise.resolve(vm)
  } catch (error) {
    return Promise.reject(error)
  }
}
