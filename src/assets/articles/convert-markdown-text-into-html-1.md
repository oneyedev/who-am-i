# Mark Down Text into Vue Component (1)(vue-showdown-highlight)

Markdown Text는 작성시의 간편함과 HTML 과의 좋은 궁합으로 인해, readme.md와 같이 간단한 설명서를 작성할 때 자주 사용되는 언어이다 *_이 블로그의 문서 또한 Markdown으로 작성되어 배포되고 있다.* Vue Framework를 사용했을 때, Markdown Text를 HTML로 변환해 보자. 문서는 두 번에 나누어 작성되었다. 첫 번째는 showdown을 활용하여 Markdown Text을 HTML 구조에 맞추어 변환하는 것과 두 번째는 변환된 HTML에서 Code부분은 Syntax highlighting 하는 것을 볼 것이다. 우리는 이 두 문서를 통해 Markdown Text를 최대한 github의 readme.md문서와 비슷하게 만들어볼 것이다(GFM: Github Flavored Markdown).

우리는 여기서 두 가지 유용한 모듈을 사용한다.
- showdown - Markdown Text를 HTML로 바꾸어주는 Javascript Module(http://showdownjs.com).
- highlight - 웹 상에서 syntax highlight을 도와주는 Javascript Module. 특히 code를 보여줄 때 유용하다(https://highlightjs.org).

## Preview
https://oneyedev.github.io/markdown-to-html-playground/

## Installation
vue-cli를 통해 default로 프로젝트를 생성 한 후, vue에서 showdown을 쉽게 사용하도록 도와주는 vue-showdown 모듈을 설치하자. 설치 시 showdown은 안에 포함되어 있다(https://vue-showdown.js.org).
```sh
npm install vue-showdown
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
```html
<!-- src/App.vue -->
<template>
  <div id="app">
    <vue-showdown markdown="# Markdown to HTML playground" flavor="github"></vue-showdown>
  </div>
</template>
```
```sh
npm run serve
```
브라우저에서 `Markdown to HTML playground` 가 h1 태그로 묶여 나오면 성공이다. showdown에 의해  # 식별자가 h1태그가 되는 것을 볼 수 있다.
```md
# Markdown to HTML playground
```

<center>↓</center>

```html
<h1>Markdown to HTML playground</h1>
```

## Creating a Playground
Markdown text를 입력받아 동적으로 HTML으로 바꾸어주는 Playground Component 작성해보자

### template
입력받을 textarea의 `v-model`을 지정한 후 vue-showdown의 `markdown`과 연결 해주자  

```html
<template>
  <div class="wrapper">
    <div class="flex">
      <h3 class="header">Markdown (Input)</h3>
      <textarea
        v-model="markdown"
        placeholder="Insert your Markdown Text"
      ></textarea>
    </div>
    <div class="flex">
      <h3 class="header">HTML (Output)</h3>
      <div class="output">
        <vue-showdown
            :markdown="markdown"
            flavor="github"
        ></vue-showdown>
      </div>
    </div>
  </div>
</template>
```
### javascript
```js

export default {
  data() {
    return {
      markdown: ''
    };
  }
};

```
### CSS
```css
.wrapper {
  display: flex;
  flex-wrap: wrap;
}
textarea {
  font-size: 15px;
  width: 95%;
  min-height: 600px;
  padding: 5px;
  border: black solid 1px;
  resize: vertical;
}
@media screen and (max-width: 600px) {
  .flex {
    width: 100%;
  }
}
@media screen and (min-width: 601px) {
  .flex {
    width: 50%;
  }
}
.header {
  text-align: center;
}
.output {
  border: black solid 1px;
  min-height: 600px;
  padding: 5px;
}

```

## Decorate with github-markdown-css
showdown은 기본적으로 HTML구조로의 변환만 지원할 뿐, CSS가 적용되진 않는다. Github처럼 보이게 하려면 추가적인 css작업이 필요하다.

https://www.npmjs.com/package/github-markdown-css

```sh
npm install github-markdown-css
```
매우 간단한 모듈로 css파일 하나만 존재한다. 바로 적용해서 사용하자

```js
// src/main.js
import 'github-markdown-css'
```
해당 모듈은 markdown-body라는 class 이름을 구분자로 사용한다. 따라서 우리는 우리가 작성한 컴포넌트에 markdown-body라는 class 이름을 추가해야한다. 여기서는 playground 성격상 동적으로 추가되게 하자. 고정으로 적용되게하려면 `class="markdown-body"`만 적어도 무방하다.
```html
<select v-model="outputStyle">
    <option value>Only HTML</option>
    <option value="markdown-body">github-markdown-css</option>
</select>
```
```html
<vue-showdown :markdown="markdown" flavor="github" :class="outputStyle"></vue-showdown>
```
```js
export default{
    data() {
        markdown: "",
        outputStyle: ""    
    }
}
```

## Adding to main app
작성한 Playground Component를 App.vue에 등록하고 사용하면 된다
```js
import Playground from "@/components/Playground";
export default {
  name: "app",
  components: { Playground }
};
```

이제 좌측 textarea에 아래 텍스트를 입력하고, select option에 github-markdown-css를 지정해보자. 이전과 다르게 h1 태그에 밑줄이 쳐질 것이다.

```
# Markdown to HTML playground
```

여기까지만 해도 훌륭한 playground가 되었다. 하지만 안타까운 점이 존재한다. 아래 코드블록을 나타내는 ```를 입력해보면 이전과 다르게 박스가 생기긴하나, 가독성에 중요한 부분인 syntax highlight가 적용되지 않는 것을 볼 수 있다.

<pre><code class="">```js
let var1 = 'hello world'
```</code></pre>


다음에는 지금까지 작성한 playground에 이어 syntax highlight를 지원해주는 highlight.js를 적용해보자.
