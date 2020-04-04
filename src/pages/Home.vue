<template>
  <section>
    <v-parallax :src="require('@/assets/logo.jpg')" height="800">
      <v-layout column align-center justify-center class="white--text">
        <img
          :src="require('@/assets/avartar.png')"
          alt="Avartar"
          height="200"
        />
        <h1 class="white--text mb-2 display-1 text-xs-center">
          Welcome to One Eyed Developer Blog
        </h1>
        <div class="subheading mb-3 text-xs-center">
          This is personal blog about IT, Game Development etc
        </div>
        <div class="d-flex mt-5">
          <v-btn
            class="blue lighten-2"
            dark
            large
            @click="$router.push('/articles')"
          >
            Go to articles
          </v-btn>
          <v-btn
            class="orange darken-1"
            dark
            large
            @click="$router.push('/games')"
          >
            Go to games
          </v-btn>
        </div>
      </v-layout>
      <span class="body-1 text-xs-left">
        Photo by Émile Perron on Unsplash
      </span>
    </v-parallax>
  </section>
</template>

<script>
export default {
  components: {}
}
</script>
