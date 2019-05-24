<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12>
        <v-select
          v-model="selectedTags"
          :items="tags"
          label="Filter"
          multiple
          chips
          hint="Select tags"
          persistent-hint
        ></v-select>
      </v-flex>
      <v-flex
        v-for="(card, index) in filtered"
        :key="index"
        v-bind="{ ['xs12']: true, ['sm6']: true, ['md4']: true, ['xl3']: true }"
      >
        <v-card>
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
            <!-- <v-btn flat color="orange">Share</v-btn> -->
            <v-btn flat color="orange" @click="goToArticle(card.to)">
              read
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import articles from '@/assets/articles/articles.json'
import filters from '@/mixins/filters'
export default {
  mixins: [filters],
  data() {
    return {
      cards: articles,
      selectedTags: []
    }
  },
  computed: {
    tags() {
      return [...new Set(this.cards.map(card => card.tags).flat())]
    },
    filtered() {
      return this.cards.filter(card => {
        for (const selected of this.selectedTags) {
          if (card.tags.includes(selected)) {
            return true
          }
        }
        return false
      })
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
