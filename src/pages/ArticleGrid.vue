<template>
  <card-grid :cards="cards" :selected-tags="selectedTags">
    <v-card slot-scope="{ card }">
      <v-img :src="card.src" aspect-ratio="1.5" contain></v-img>
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
        <v-btn text color="orange" @click="goToArticle(card.to)">
          read
        </v-btn>
      </v-card-actions>
    </v-card>
  </card-grid>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Article } from '@/types/Article'
import articles from '@/assets/articles.json'
import { toDateFormat } from '@/mixins/filters'
import CardGrid from '@/layouts/CardGrid.vue'
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteUpdate',
  'beforeRouteLeave'
])
@Component({
  components: {
    CardGrid
  },
  filters: {
    toDateFormat
  },
  beforeRouteEnter(to, from, next) {
    const tags = to.hash.split(/#/g).filter(Boolean)
    next((vm: any) => vm.setFilterTags(tags))
  },
  beforeRouteUpdate(to, from, next) {
    const tags = to.hash.split(/#/g).filter(Boolean)
    const vm: any = this
    vm.setFilterTags(tags)
    next()
  }
})
export default class ArticleGrid extends Vue {
  cards: Array<Article> = articles
  selectedTags: Array<string> = []
  goToArticle(to: string) {
    this.$router.push({ name: 'article', query: { id: to } })
  }
  setFilterTags(tags: Array<string>) {
    this.selectedTags = tags
  }
}
</script>

<style scoped></style>
