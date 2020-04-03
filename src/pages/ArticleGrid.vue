<template>
  <card-grid :cards="cards" :selected-tags="selectedTags">
    <v-card slot-scope="{ card }">
      <v-img :src="card.src" aspect-ratio="1.5"></v-img>
      <v-divider></v-divider>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{ card.title }}</h3>
          <span class="grey--text lighten-2">
            {{ card.regTime | toDateFormat }}
          </span>
        </div>
      </v-card-title>
      <v-card-text>
        <div>{{ card.text }}</div>
      </v-card-text>
      <v-card-text>
        <v-chip v-for="tag in card.tags" :key="tag">{{ tag }}</v-chip>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat color="orange" @click="goToArticle(card.to)">
          read
        </v-btn>
      </v-card-actions>
    </v-card>
  </card-grid>
</template>

<script>
import articles from '@/assets/articles/articles.json'
import filters from '@/mixins/filters'
import CardGrid from '@/layout/CardGrid'
export default {
  mixins: [filters],
  components: {
    CardGrid
  },
  data() {
    return {
      cards: articles,
      selectedTags: []
    }
  },
  beforeRouteEnter(to, from, next) {
    const tags = to.hash.split(/#/g).filter(Boolean)
    next(vm => vm.setFilterTags(tags))
  },
  beforeRouteUpdate(to, from, next) {
    const tags = to.hash.split(/#/g).filter(Boolean)
    this.setFilterTags(tags)
    next()
  },
  methods: {
    goToArticle(to) {
      this.$router.push({ name: 'article', query: { id: to } })
    },
    setFilterTags(tags) {
      if (tags.length > 0) {
        this.selectedTags = tags
      } else {
        this.selectedTags = this.tags
      }
    }
  }
}
</script>

<style scoped></style>
