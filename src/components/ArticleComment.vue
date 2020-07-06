<template>
  <div class="pa-3">
    <disqus
      shortname="personal-blog-for-oneyedev"
      :identifier="id"
      :url="`https://oneyedev.github.io/article?id=${id}`"
      :title="title"
    ></disqus>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({})
export default class ArticleComment extends Vue {
  @Prop() id?: string
  @Prop() title?: String
}
</script>

<style lang="scss" scoped></style>
