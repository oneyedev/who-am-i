<template>
  <v-container :class="$style.container">
    <v-card
      :class="{
        'pa-4': $vuetify.breakpoint.smAndDown,
        'pa-5': $vuetify.breakpoint.mdAndUp
      }"
    >
      <article-contents
        :id="id"
        @ready="onReadyArticleContents"
      ></article-contents>
    </v-card>
    <article-menu v-if="contents" :contents="contents"></article-menu>
  </v-container>
</template>

<script>
import ArticleMenu from '@/components/ArticleMenu'
import ArticleContents from '@/components/ArticleContents'
export default {
  components: { ArticleMenu, ArticleContents },
  data() {
    return {
      id: '',
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
