<template>
  <v-toolbar app>
    <v-toolbar-side-icon
      @click="$store.commit('navSwitch')"
    ></v-toolbar-side-icon>
    <v-toolbar-title
      class="headline text-uppercase cursor-pointer"
      @click="$router.push('/')"
    >
      <span>One Eyed </span>
      <span class="font-weight-light">Developer</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down"> </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
.cursor-pointer
  cursor pointer
</style>
