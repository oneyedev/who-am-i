<template>
  <div class="pa-3">
    <vue-disqus
      shortname="personal-blog-for-oneyedev"
      :identifier="id"
      :url="`https://oneyedev.github.io/article?id=${id}`"
      :title="title"
    ></vue-disqus>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    title: String
  }
}
</script>

<style lang="scss" scoped></style>
