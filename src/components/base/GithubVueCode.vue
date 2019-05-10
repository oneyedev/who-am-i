<template>
  <v-tabs dark>
    <v-tab v-for="(item, index) in items" :key="index">{{ item.title }}</v-tab>
    <v-tab-item v-for="(item, index) in items" :key="index">
      <vue-showdown
        class="markdown-body"
        :markdown="item.code"
        flavor="github"
        :extensions="['showdownHighlight']"
      ></vue-showdown>
    </v-tab-item>
  </v-tabs>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    items: [],
    doc: null
  }),
  async created() {
    const response = await this.$axios.get(this.url)
    this.parseVueFile(response.data)
  },
  methods: {
    parseVueFile(text) {
      this.items = []
      this.doc = new DOMParser().parseFromString(text, 'text/html')
      this.parseItem('template', 'html')
      this.parseItem('script', 'js')
      this.parseItem('style', 'css')
    },
    parseItem(tag, language) {
      const result = this.doc.getElementsByTagName(tag)[0]
      const title = tag
      const code = '```vue\n' + result.outerHTML + '\n```'
      if (result) {
        this.items.push({ title, language, code })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
