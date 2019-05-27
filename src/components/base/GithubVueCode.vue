<template>
  <v-tabs dark>
    <v-tab v-for="(item, index) in items" :key="index">{{ item.title }}</v-tab>
    <v-tab-item v-for="(item, index) in items" :key="index">
      <vue-showdown
        v-if="item.code"
        class="markdown-body"
        :markdown="item.code"
        flavor="github"
        :extensions="['showdownHighlight']"
      ></vue-showdown>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import { renderByRuntime } from '@/plugins/vue-md-component'
export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    preview: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    doc: null
  }),
  computed: {
    template() {
      return this.parseTag('template')
    },
    script() {
      return this.parseTag('script')
    },
    style() {
      return this.parseTag('style')
    },
    items() {
      const result = []
      if (this.template) {
        result.push(this.template)
      }
      if (this.script) {
        result.push(this.script)
      }
      if (this.style) {
        result.push(this.style)
      }
      if (this.preview) {
        result.push({ title: 'preview' })
      }
      return result
    }
  },
  async mounted() {
    const response = await this.$axios.get(this.url)
    this.doc = new DOMParser().parseFromString(response.data, 'text/html')
    this.compilePreview()
  },
  methods: {
    parseTag(tag) {
      if (!this.doc) return undefined
      const result = this.doc.getElementsByTagName(tag)[0]
      if (result) {
        const title = tag
        const code = '```vue\n' + result.outerHTML + '\n```'
        const innerCode = result.innerHTML
        return { title, code, innerCode }
      } else {
        return undefined
      }
    },
    compilePreview() {
      if (!this.preview) return
      const template = this.template.innerCode
      const script = this.script.innerCode
      renderByRuntime(document.getElementById(this.url), { template, script })
    }
  }
}
</script>

<style lang="scss" scoped></style>
