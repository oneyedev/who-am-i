<template>
  <v-app>
    <navigation-drawer></navigation-drawer>
    <tool-bar></tool-bar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import NavigationDrawer from '@/layout/NavigationDrawer.vue'
import ToolBar from '@/layout/ToolBar.vue'
export default {
  components: {
    NavigationDrawer,
    ToolBar
  },
  name: 'App',
  data() {
    return {
      //
    }
  }
}
</script>
<style lang="stylus" scoped></style>
