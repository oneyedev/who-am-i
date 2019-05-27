<template>
  <div class="pa-3" id="disqus_thread"></div>
</template>

<script>
export default {
  props: {
    id: String,
    title: String
  },
  mounted() {
    const id = this.id
    const title = this.title
    window.disqus_config = function() {
      this.page.url = `https://oneyedev.github.io/article?id=${id}` // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = id // Replace PAGE_IDENTIFIER with your page's unique identifier variable
      this.page.title = title
    }
    var s = document.createElement('script')
    s.src = 'https://personal-blog-for-oneyedev.disqus.com/embed.js'
    s.setAttribute('data-timestamp', +new Date())
    this.$el.appendChild(s)
  }
}
</script>

<style lang="scss" scoped></style>
