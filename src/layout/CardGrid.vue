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
        <slot :card="card"></slot>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    cards: Array,
    selectedTags: Array
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
  }
}
</script>

<style scoped></style>
