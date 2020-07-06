<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="$emit('click:nav')"></v-app-bar-nav-icon>
    <v-toolbar-title>
      <router-link to="/" class="text-decoration-none black--text">
        <span class="headline text-uppercase">One Eyed</span>
        <span class="headline font-weight-light"> Developer</span>
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down"> </v-toolbar-items>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class AppBar extends Vue {}
</script>

<style scoped></style>
