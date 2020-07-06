<template>
  <v-img :src="require('@/assets/home.jpg')" height="calc(100vh - 64px)">
    <div
      class="d-flex flex-column justify-center align-center white--text fill-height text-center"
    >
      <img :src="require('@/assets/avartar.png')" alt="Avartar" height="200" />
      <h1 class="white--text mb-2 display-1">
        Welcome to One Eyed Developer Blog
      </h1>
      <div class="subheading mb-3">
        This is personal blog about IT, Game Development etc
      </div>
      <div class="d-flex mt-5">
        <v-btn
          class="blue lighten-2 ma-2"
          dark
          large
          @click="$router.push('/articles')"
        >
          Go to articles
        </v-btn>
        <v-btn
          class="orange darken-1 ma-2"
          dark
          large
          @click="$router.push('/games')"
        >
          Go to games
        </v-btn>
      </div>
    </div>
    <span class="body-1 white--text footer">
      Photo by Émile Perron on Unsplash
    </span>
  </v-img>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.footer {
  position: absolute;
  left: 8px;
  bottom: 8px;
}
</style>
