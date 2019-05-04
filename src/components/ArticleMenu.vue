<template>
  <div>
    <v-btn @click="onClickBookmark" color="pink" dark fixed bottom right fab>
      <v-icon>bookmark</v-icon>
    </v-btn>
    <article-index
      class="article_index"
      v-show="isShowIndex"
      :items="indexes"
    ></article-index>
  </div>
</template>

<script>
import ArticleIndex from '@/components/ArticleIndex'
export default {
  components: { ArticleIndex },
  props: {
    contents: HTMLDivElement
  },
  data: () => ({
    isShowIndex: false
  }),
  computed: {
    indexes() {
      const nodeList = this.contents.querySelectorAll('h1, h2, h3')
      return this.nodeListToIndexItems(nodeList)
    }
  },
  methods: {
    onClickBookmark() {
      this.isShowIndex = !this.isShowIndex
    },
    nodeListToIndexItems(nodeList) {
      let arr = []
      let target = arr
      let id = 0
      nodeList.forEach(node => {
        const item = this.nodeToIndexItem(node)
        item.id = ++id
        if (node.tagName === 'H1') {
          item.children = []
          arr.push(item)
        } else if (node.tagName === 'H2') {
          item.children = []
          arr.push(item)
          target = item.children
        } else if (node.tagName === 'H3') {
          target.push(item)
        }
      })
      return arr
    },
    nodeToIndexItem(node) {
      return { name: node.innerText, target: node.id }
    }
  }
}
</script>

<style lang="stylus" scoped>
.article_index
    position: fixed
    bottom: 16px
    right: 100px
    padding: 10px
@media (max-width: 600px) {
  .article_index {
    right: 90px
  }
}
</style>
