<template>
  <v-navigation-drawer
    app
    stateless
    :value="isNavOn"
    :temporary="$vuetify.breakpoint.xsOnly"
  >
    <v-list>
      <v-list-tile @click="goToPage('/')">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-title to="/">Home</v-list-tile-title>
      </v-list-tile>

      <v-list-group prepend-icon="chrome_reader_mode" no-action value="false">
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-title>Articles</v-list-tile-title>
          </v-list-tile>
        </template>

        <v-list-tile
          v-for="(article, i) in articles"
          :key="i"
          @click="goToPage(article.to)"
        >
          <v-list-tile-content>
            <v-list-tile-title v-text="article.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      articles: [
        {
          title: 'All',
          to: '/articles'
        },
        {
          title: 'Vue',
          to: '/articles#vue'
        }
      ]
    }
  },
  computed: {
    isNavOn() {
      return this.$store.getters['isNavOn']
    }
  },
  methods: {
    goToPage(to) {
      this.$router.push(to)
      if (this.$vuetify.breakpoint.name === 'xs') {
        this.$store.commit('navSwitch', false)
      }
    }
  }
}
</script>

<style scoped></style>
