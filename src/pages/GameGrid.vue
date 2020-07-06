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
        <v-btn text color="orange" @click="goToGame(card.to)">
          read
        </v-btn>
      </v-card-actions>
    </v-card>
  </card-grid>
</template>

<script>
import games from '@/assets/games.json'
import { toDateFormat } from '@/mixins/filters'
import CardGrid from '@/layouts/CardGrid.vue'
export default {
  filters: {
    toDateFormat
  },
  components: {
    CardGrid
  },
  data() {
    return {
      cards: games,
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
    goToGame(to) {
      this.$router.push({ name: 'game', query: { id: to } })
    },
    setFilterTags(tags) {
      this.selectedTags = tags
    }
  }
}
</script>

<style scoped></style>
