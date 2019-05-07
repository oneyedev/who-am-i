# Create Document Bookmark Anchor

article 문서를 읽을 때 자동으로 목차를 옆에 띄워주는 북마크를 만들어보자.

## Preview
https://oneyedev.github.io/vue-router-anchor-scroll-sample/

## Get Anchors
```html
This is vue router anchor scroll sample!
<h1 id="section1">section1</h1>
    Lorem ipsum litora lacinia phasellus aenean placerat phasellus, urna sed
    cubilia convallis cubilia feugiat nec feugiat, diam eu proin feugiat
    vulputate fusce porta quis dictum auctor phasellus posuere tempus convallis
    vel tincidunt elit.
<h1 id="section2">section2</h1>
    Diam at etiam tellus id scelerisque aliquam lacinia lacus, placerat habitant
    faucibus sagittis eu platea dapibus sit, varius ut phasellus etiam amet
    vehicula eleifend.
<h1 id="section3">section3</h1>
    Mollis vehicula quis hac nunc id etiam vivamus iaculis primis, aenean
    ultricies pretium torquent conubia adipiscing habitasse eget, aptent orci
    quis odio et elementum praesent at nec eu posuere mauris ultricies.
<h1 id="section4">section4</h1>
    Orci maecenas tincidunt ut sapien pretium phasellus volutpat eu lacus cursus
    integer nostra aptent iaculis, lectus tellus aenean turpis erat senectus
    rutrum feugiat tortor molestie himenaeos tristique diam scelerisque feugiat
    semper conubia fames metus sollicitudin.
<h1 id="section5">section5</h1>
    Nisi nullam ultrices auctor risus himenaeos vulputate commodo eros, augue
    litora ad praesent dapibus luctus pellentesque quam, quisque ultrices
    laoreet commodo ultrices enim nulla.
<h1 id="section6">section6</h1>
    Est elementum semper diam odio venenatis scelerisque blandit elit orci,
    aptent euismod interdum curae felis nisi taciti conubia, feugiat porta
    posuere pellentesque massa at sapien bibendum.
```

위와 같은 HTML이 있다고 할 때 목차역할을 h1 태그를 가져오자. 해당 DOM 트리가 완성되고나서 가져와야 하므로 `mounted` 이벤트 훅에서 실행해야한다.

```js
export default {
  data: () => ({
    anchors: []
  }),
  mounted() {
    this.anchors = [...document.querySelectorAll("h1")];
  }
}
```

해당 HTML엘리먼트를 이용해 북마크 기능을 담당하는 Component를 작성하자
```html
<div class="index">
    <ul>
    <li
        v-for="anchor in anchors"
        :key="anchor.id"
        class="index_item"
        @click="goToAnchor(anchor)"
    >
        {{ anchor.id }}
    </li>
    </ul>
</div>
```

```css
.index {
  position: fixed;
  font-size: 1.2rem;
  right: 20px;
  bottom: 20px;
  padding-right: 20px;
  background: #f5cba7;
}
.index_item {
  cursor: pointer;
}
```

> 페이지가 스크롤이 되는 것을 확인하기 위해 의도적으로 font-size를 크게 하였다. 페이지가 스크롤이 될 정도로 커야만 anchor에 따라 움직이는 것을 확인할 수 있다. 

## Move to Anchor
anchor에 따라 스크롤을 움직이게 하는 방법은 크게 세 가지가 있다.

### Update `location.hash`
HTML5에서는 주소창의 hash값을 가지고 기본적으로 Element의 id anchor기능을 제공한다.  

```js
export default {
 methods: {
    goToAnchor(anchor) {
      location.hash = "#" + anchor.id;
    }
  }
}
``` 
이 방법은 vue-router에서 지원하는 고급기능을 많이 활용하지는 못하나,가장 간단하고 `vue`종속적이지 않은 방법이다. 

### Using `window.scrollBy` 
만일 어떠한 이유에선지 위의 방법이 통하지 않는다면 `window`의 `scrollBy` 메소드를 이용하는 것도 가능하다.

```js
export default {
 methods: {
    goToAnchor(anchor) {
      const el = document.getElementById(anchor.id);
      const top = el.getBoundingClientRect().top;
      window.scrollBy(0, top);
    }
  }
}
```
이 방법 또한 `vue` 종속적이지 않다는 장점이 있다.

### scrollBehavior in `vue-router`
`vue-router`의 `scrollBehavior`속성을 이용하여 구현할 수도 있다.

```js
export default {
 methods: {
    goToAnchor(anchor) {
      const name = this.$route.name;
      const hash = "#" + anchor.id;
      this.$router.push({ name, hash });
    }
  }
}
```
`goToAnchor`메소드 호출 시 주소창의 hash값이 업데이트 되며 `vue-router`내의 `scrollBehavior` 메소드가 호출된다.

```js
new Router({
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
        return {
          selector: to.hash
        };
    }
  }
})
```
> `scrollBehavior`메소드는 `history`모드에서만 동작한다. 자세한 사항은 [공식 문서](https://router.vuejs.org/guide/advanced/scroll-behavior.html) 참조
