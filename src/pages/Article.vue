<template>
  <v-container :class="$style.container">
    <v-card
      :class="{
        'pa-3': $vuetify.breakpoint.smAndDown,
        'pa-5': $vuetify.breakpoint.mdAndUp
      }"
    >
      <VueShowdown
        class="markdown-body"
        :markdown="markdown"
        flavor="github"
        :extensions="['showdownHighlight']"
      >
      </VueShowdown>
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
      next(vm => {
        vm.markdown = module.default
      })
    } catch (error) {
      next(false)
    }
  },
  async beforeRouteUpdate(to, from, next) {
    try {
      const module = await import(`@/assets/articles/${to.params.src}.md`)
      next(vm => {
        vm.markdown = module.default
      })
    } catch (error) {
      next(false)
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
pre code {
  display: inline-block;
}

code {
  box-shadow: none;
  font-weight: 400;
  color: #333333;
}

code:before {
  content: none;
}
</style>
