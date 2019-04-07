# Mark Down Text into Vue Component (1)(vue-showdown-highlight)

Markdown Text는 작성시의 간편함과 HTML 과의 좋은 궁합으로 인해, readme.md와 같이 간단한 설명서를 작성할 때 자주 사용되는 언어이다 *_이 블로그의 문서 또한 Markdown으로 작성되어 배포되고 있다.* Vue Framework를 사용했을 때, Markdown Text를 HTML로 변환해 보자. 문서는 두 번에 나누어 작성되었다. 첫 번째는 showdown을 활용하여 Markdown Text을 HTML 구조에 맞추어 변환하는 것과 두 번째는 변환된 HTML에서 Code부분은 Syntax highlighting 하고 custom css를 적용해 볼 것이다. 우리는 이 두 문서를 통해 Markdown Text를 github의 readme.md문서와 최대한 비슷하게 만들어볼 것이다(GFM: Github Flavored Markdown).

우리는 여기서 두 가지 유용한 모듈을 사용한다.
- showdown - Markdown Text를 HTML로 바꾸어주는 Javascript Module(http://showdownjs.com).
- highlight - 웹 상에서 syntax highlight을 도와주는 Javascript Module. 특히 code를 보여줄 때 유용하다(https://highlightjs.org).

## Preview
https://oneyedev.github.io/markdown-to-html-playground/

## Installation
vue-cli를 통해 default로 프로젝트를 생성 한 후, vue에서 showdown을 쉽게 사용하도록 도와주는 vue-showdown 모듈을 설치하자. 설치 시 showdown은 안에 포함되어 있다(https://vue-showdown.js.org).
```sh
npm install vue-showdown --save
```

## Adding vue-showdown Plugin
기본값으로 프로젝트를 생성했다면 plugin 폴더가 따로 없을 것이다. plugins폴더를 만들고 vue-showdown을 Vue에 등록하자.

```js
// src/plugins/vue-showdown.js
import Vue from 'vue'
import VueShowdown from 'vue-showdown'
Vue.use(VueShowdown)
```

```js
// src/main.js
import './plugins/vue-showdown'
```

Component가 제대로 등록되었는지 테스트해보자. App.vue의 template 부분을 아래와 같이 바꾸고, 실행해보자.
```vue
<!-- src/App.vue -->
<template>
  <div id="app">
    <vue-showdown
      markdown="# Hello vue-showdown-highlight"
      flavor="github"
    ></vue-showdown>
  </div>
</template>
```
```sh
npm run serve
```
브라우저에서 `Hello vue-showdown-highlight` 가 h1 태그로 묶여 나오면 성공이다. showdown에 의해  # 식별자가 h1태그가 되는 것을 볼 수 있다.
<pre>
# Hello vue-showdown-highlight
</pre>

<center>↓</center>

```html
<h1>Hello vue-showdown-highlight</h1>
```

> Vue Cli로 만든 default project는 App css에 `text-align: center;`가 적용되어 있으므로 가운데 정렬을 해제하고 싶으면 해당 속성을 삭제하면 된다.

아래에 Markdown sample이 있으니 테스트시 활용하자.

<pre># This is a h1
## This is a h2 
### This is a h3
#### This is a h4
##### This is a h5
###### this is a h6
</pre>
<pre>
- This is a unordered item1
- This is a unordered item2
- This is a unordered item3

1. This is a ordered item1
1. This is a ordered item2
1. This is a ordered item3

* depth1
 * depth2
   * depth3 is not working! (maybe.. bug?)
</pre>
<pre>
[This is a hyper link](https://google.com)
![This is a image](https://picsum.photos/200/200/?random)
![This is a image alt](https://)
</pre>
<pre>
**This is a emphasizing text**
*This is a italic-style text*
> This is a block quote
</pre>
<pre><code>```
This is a code block
```

```js
const HELLO_WORLD = 'Hello World!'
```
</code></pre>

## Decorate with github-markdown-css
showdown은 기본적으로 HTML구조로의 변환만 지원할 뿐, CSS가 자동 적용되진 않는다. Github처럼 보이게 하려면 추가적인 css작업이 필요하다. 아래 모듈은 css파일 하나만 존재한다.

```sh
npm install github-markdown-css --save
```

```js
// src/plugins/vue-showdown.js
import 'github-markdown-css'
```

```vue
<template>
  <div id="app">
    <vue-showdown
      markdown="# Hello vue-showdown-highlight"
      flavor="github"
      class="markdown-body"
    ></vue-showdown>
  </div>
</template>
```

> 전역 CSS로 적용되니 다른 CSS와 겹치지 않도록 주의하자. `markdown-body`를 class 구분자로 사용한다

`github-markdown-css`는 내부 스타일만 선언되어있다. border와 padding 등은 직접 추가하자. 해당 css는 공식 사이트에서 참조하였다(https://www.npmjs.com/package/github-markdown-css)

```vue
<style>
/* src/App.vue */
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
  border: 1px solid #d1d5da;
  border-radius: 3px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>
```

여기까지만 해도 훌륭한 문서가 되었다. 그러나 한 가지 코드블록 부분에서 가독성에 중요한 부분인 syntax highlight가 적용되지 않는 것을 볼 수 있다. 다음에는 highlight.js를 적용해서 syntax highlight를 적용해보자.
<pre>// before higlight.js
const HELLO_WORLD = 'Hello World'
</pre>

<center>↓</center>

```js
// after higlight.js
const HELLO_WORLD = 'Hello World'
```
