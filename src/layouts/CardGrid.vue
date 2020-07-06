<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(card, index) in filtered"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        xl="3"
      >
        <slot :card="card"></slot>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Card } from '@/types/Card'
@Component({})
export default class CardGrid extends Vue {
  @Prop() cards!: Array<Card>
  @Prop() selectedTags!: Array<String>

  get filtered(): Array<Card> {
    if (this.selectedTags.length === 0) {
      return this.cards
    }
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
</script>

<style scoped></style>
