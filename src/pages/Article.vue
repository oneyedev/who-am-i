<template>
  <v-container>
    <v-card class="pa-3">
      <vue-showdown :markdown="markdown"> </vue-showdown>
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
  }
}
</script>

<style scoped></style>
