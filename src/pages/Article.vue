<template>
  <v-container :class="$style.container">
    <v-card
      :class="{
        'pa-4': $vuetify.breakpoint.smAndDown,
        'pa-5': $vuetify.breakpoint.mdAndUp
      }"
    >
      <vue-showdown
        :class="`markdown-body ${$style.index}`"
        :markdown="markdown"
        flavor="github"
        :extensions="['showdownHighlight', 'h2LinkExtension']"
      ></vue-showdown>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    src: String
  },
  data() {
    return {
      markdown: ''
    }
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const module = await import(`@/assets/articles/${to.params.src}.md`)
      next(vm => vm.setMarkdown(module.default))
    } catch (error) {
      next(false)
    }
  },
  methods: {
    async setMarkdown(markdown) {
      this.markdown = markdown
      await this.$nextTick()
      this.moveToindex(this.$route.hash)
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

.index h2 {
  margin-top: -50px !important;
  padding-top: 74px !important;
}
.index h2 i {
  transform: rotate(-45deg);
}
</style>
