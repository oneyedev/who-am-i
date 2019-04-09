<template>
  <v-app>
    <navigation-drawer></navigation-drawer>
    <tool-bar></tool-bar>
    <v-content>
      <router-view></router-view>
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
<style lang="stylus">
pre code {
  display: inline-block;
}

code {
  box-shadow: none;
  font-weight: 400;
  color: #333333;
}

code:before {
  content: none;
}
code::after {
  content: none;
}
</style>
