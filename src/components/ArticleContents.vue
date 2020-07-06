<template>
  <vue-showdown
    :class="`markdown-body ${$style.index} ${$style.tomorrow}`"
    :markdown="markdown"
    :extensions="['showdownHighlight', 'linkExtension']"
  ></vue-showdown>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { renderByTagName } from '@/plugins/vue-md-component'
import axios from 'axios'
@Component({})
export default class ArticleContents extends Vue {
  @Prop({ type: String, default: '' }) id!: string
  markdown = ''
  created() {
    this.createContents(this.id)
  }
  async createContents(id: string) {
    try {
      const response = await axios.get(`/static/articles/${id}.md`)
      this.markdown = response.data
      await this.$nextTick()
      await renderByTagName(this.$el)
      this.raiseOnReadyContents(this.$el)
    } catch (error) {
      console.warn(error)
      this.markdown = '<center>No article contents</center>'
    }
  }
  raiseOnReadyContents(el: Element) {
    this.$emit('ready', el)
  }
}
</script>

<style module>
.index i {
  transform: rotate(-45deg);
}
</style>
