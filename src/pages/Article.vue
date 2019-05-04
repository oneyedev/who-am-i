<template>
  <v-container :class="$style.container">
    <v-card
      :class="{
        'pa-4': $vuetify.breakpoint.smAndDown,
        'pa-5': $vuetify.breakpoint.mdAndUp
      }"
    >
      <vue-showdown
        ref="contents"
        :class="`markdown-body ${$style.index}`"
        :markdown="markdown"
        flavor="github"
        :extensions="['showdownHighlight', 'linkExtension']"
      ></vue-showdown>
    </v-card>
    <article-menu v-if="contents" :contents="contents"></article-menu>
  </v-container>
</template>

<script>
import ArticleMenu from '@/components/ArticleMenu'
export default {
  components: { ArticleMenu },
  data() {
    return {
      markdown: '',
      contents: null
    }
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const module = await import(`@/assets/articles/${to.query.id}.md`)
      next(vm => vm.setMarkdown(module.default))
    } catch (error) {
      const id = to.query.id
      const message = id ? `Not found ${id}` : 'Query param "id" is required'
      console.warn(message)
      next('/articles')
    }
  },
  created() {
    window.onClickArticleAnchor = this.onClickArticleAnchor
  },
  beforeDestroy() {
    window.onClickArticleAnchor = null
  },
  methods: {
    onClickArticleAnchor(hash) {
      this.$router.push({
        name: 'article',
        query: { id: this.$route.query.id },
        hash: hash
      })
    },
    async setMarkdown(markdown) {
      this.markdown = markdown
      await this.$nextTick()
      this.moveToindex(this.$route.hash)
      this.contents = this.$refs['contents'].$el
    },
    async moveToindex(hash) {
      if (!hash) {
        return
      }
      try {
        const index = document.querySelector(hash)
        index.getElementsByTagName('a')[0].click()
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

.index h2,
.index h3 {
  margin-top: -50px !important;
  padding-top: 74px !important;
}
.index i {
  transform: rotate(-45deg);
}

.article_index {
  position: fixed;
}
</style>
