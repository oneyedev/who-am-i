<template>
  <v-navigation-drawer
    app
    :value="value"
    @input="v => $emit('input', v)"
    :temporary="$vuetify.breakpoint.xsOnly"
  >
    <v-list>
      <v-list-item @click="$router.push('/')">
        <v-list-item-action>
          <v-icon>mdi-home</v-icon>
        </v-list-item-action>
        <v-list-item-title to="/">Home</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-group prepend-icon="mdi-file-document" no-action value="false">
        <template v-slot:activator>
          <v-list-item-title>Articles</v-list-item-title>
        </template>

        <v-list-item
          v-for="(article, i) in articles"
          :key="i"
          @click="$router.push(article.to)"
        >
          <v-list-item-content>
            <v-list-item-title v-text="article.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-divider></v-divider>
      <v-list-group prepend-icon="mdi-gamepad-variant" no-action value="false">
        <template v-slot:activator>
          <v-list-item-title>Games</v-list-item-title>
        </template>

        <v-list-item
          v-for="(game, i) in games"
          :key="i"
          @click="$router.push(game.to)"
        >
          <v-list-item-content>
            <v-list-item-title v-text="game.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({})
export default class AppMenu extends Vue {
  @Prop() private value!: Boolean
  articles = [
    {
      title: 'All',
      to: '/articles'
    },
    {
      title: 'Vue',
      to: '/articles#vue'
    },
    {
      title: 'Python',
      to: '/articles#python'
    },
    {
      title: 'Unity',
      to: '/articles#unity'
    },
    {
      title: 'Algorithm',
      to: '/articles#algorithm'
    },
    {
      title: 'Docker',
      to: '/articles#docker'
    }
  ]
  games = [
    {
      title: 'All',
      to: '/games'
    },
    {
      title: 'Monthly Iron',
      to: '/games#monthly-iron'
    }
  ]
}
</script>

<style scoped></style>
