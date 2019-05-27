# Adding Disqus to vue component
블로그 댓글 기능을 해줄 수 있는 [Disqus](https://disqus.com/)를 붙였다.

<github-vue-code url="https://gist.githubusercontent.com/oneyedev/362e1b1e1be15428f6ae99389067cb42/raw/disqus-vue-sample.vue"></github-vue-code>

## Template
`<div id="disqus_thread"></div>"`는 `embed` script에 의해 치환될 영역으로 id값을 바꾸지 말아야 한다.

## disqus_config
`window.disqus_config`로 옵션을 던져줄 수 있다.
- shortname: Disqus 포럼의 이름이다. 포럼은 Disqus thread의 모음이다. Disqus에 등록한 웹사이트 ID를 입력하면 된다.
- identifier: Disqus thread의 ID, 댓글이 달릴 현재 페이지 ID를 지정하면 된다.
- title: Disqus thread의 이름, Disqus의 서비스에서 사용될 때 노출되는 명칭이므로, 쉽게 이해할 수 있는 명칭을 지정하는 것이 좋다.
- url: Disqus thread가 embed되는 페이지의 url, Disqus 서비스에서 사용되는 링크를 지정할 수 있다.
