<template>
  <div class="d-flex justify-center">
    <iframe class="game" :src="src" allowfullscreen></iframe>
  </div>
</template>

<script>
import games from '@/assets/games'
export default {
  created() {
    const id = this.$route.query.id
    const game = games.find(game => game.to === id)
    if (game) {
      this.src = game.url
    }
  },
  data: () => ({
    src: ''
  })
}
</script>

<style scoped>
.game {
  width: 100%;
  height: calc(100vh - 20px);
}
</style>
