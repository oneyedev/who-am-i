<template>
  <v-card>
    <v-treeview
      :items="items"
      :active.sync="active"
      :open.sync="open"
      transition
    >
      <template v-slot:prepend="{ item, open }">
        •
      </template>
      <template v-slot:label="{ item }">
        <div class="item" @click="onClick(item)">
          <span>{{ item.name }}</span>
        </div>
      </template>
    </v-treeview>
  </v-card>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    active: [],
    open: []
  }),
  mounted() {
    this.open = this.items.map(item => item.id)
  },
  methods: {
    onClick(item) {
      this.$router.push({
        name: 'article',
        query: { id: this.$route.query.id },
        hash: '#' + item.target
      })
    },
    findItem(hash) {
      const flat = []
      this.items.forEach(item => this.addToArray(flat, item))
      return flat.find(item => '#' + item.target === hash)
    },
    addToArray(arr, item) {
      arr.push(item)
      if (item.children) {
        item.children.forEach(child => this.addToArray(arr, child))
      }
    }
  },
  watch: {
    $route: {
      handler: function(search) {
        const finded = this.findItem(search.hash)
        this.active.push(finded.id)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.item
  width: 100%
  cursor: pointer
@media (max-width: 600px) {
  .item {
    font-size: 1rem;
  }
}
</style>
