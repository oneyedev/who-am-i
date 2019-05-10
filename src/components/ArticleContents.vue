<template>
  <vue-showdown
    :class="`markdown-body ${$style.index}`"
    :markdown="markdown"
    flavor="github"
    :extensions="['showdownHighlight', 'linkExtension']"
  ></vue-showdown>
</template>

<script>
import { renderByTagName } from '@/plugins/vue-md-component'
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    markdown: ''
  }),
  created() {
    this.createContents(this.id)
  },
  methods: {
    async createContents(id) {
      try {
        const module = await import(`@/assets/articles/${id}.md`)
        this.markdown = module.default
        await this.$nextTick()
        await renderByTagName(this.$el)
        this.raiseOnReadyContents(this.$el)
      } catch (error) {
        console.warn(error)
        this.markdown = '<center>No article contents</center>'
      }
    },
    raiseOnReadyContents(el) {
      this.$emit('ready', el)
    }
  }
}
</script>

<style module>
.index i {
  transform: rotate(-45deg);
}
</style>
