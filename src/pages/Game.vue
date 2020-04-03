<template>
  <div class="d-flex justify-content-center">
    <iframe class="game" :src="src"></iframe>
  </div>
</template>

<script>
import games from '@/assets/games/games.json'
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
  height: calc(100vh - 100px);
}
</style>
