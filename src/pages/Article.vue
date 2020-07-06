<template>
  <v-container :class="$style.container">
    <v-card class="pa-5 pa-sm-7 pa-md-10">
      <article-contents
        :id="id"
        @ready="onReadyArticleContents"
      ></article-contents>
    </v-card>
    <article-menu v-if="contents" :contents="contents"></article-menu>
    <article-comment v-if="contents" :id="id" :title="title"></article-comment>
  </v-container>
</template>

<script>
import ArticleMenu from '@/components/ArticleMenu'
import ArticleContents from '@/components/ArticleContents'
import ArticleComment from '@/components/ArticleComment'
export default {
  components: { ArticleMenu, ArticleContents, ArticleComment },
  data() {
    return {
      id: '',
      title: '',
      contents: null
    }
  },
  created() {
    window.onClickArticleAnchor = this.onClickArticleAnchor
    this.id = this.$route.query.id
  },
  beforeDestroy() {
    window.onClickArticleAnchor = null
  },
  methods: {
    onReadyArticleContents(contents) {
      this.moveToindex(this.$route.hash)
      this.contents = contents
      this.title = document.getElementsByTagName('h1')[0].innerText
    },
    onClickArticleAnchor(hash) {
      this.$router.push({
        name: 'article',
        query: { id: this.$route.query.id },
        hash: hash
      })
    },
    async moveToindex(hash) {
      if (!hash) {
        return
      }
      try {
        const el = window.document.querySelector(hash)
        const rect = el.getBoundingClientRect()
        window.scrollBy(0, rect.top + -64)
      } catch (error) {
        console.warn(`${hash} is not founded`)
      }
    }
  }
}
</script>

<style module>
.container {
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}
@media (max-width: 600px) {
  .container {
    padding: 0;
  }
}

.article_index {
  position: fixed;
}
</style>
