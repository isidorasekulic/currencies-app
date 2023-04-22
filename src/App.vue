<template>
  <v-app id="app">
    <Navigation v-if="!isLogin" />
    <ApplicationBar v-if="!isLogin" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import ApplicationBar from "@/components/layout/ApplicationBar.vue";
import Navigation from "@/components/layout/Navigation.vue";

@Component({
  components: {
    ApplicationBar,
    Navigation,
  },
})
export default class App extends Vue {
  get isLogin() {
    return this.$route.name === "login";
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  margin: 0px;
  padding: 0px;
  overscroll-behavior: none;
  overflow: hidden;
  height: 100%;
}
.v-application .primary--text {
  color: rgba(255, 102, 0, 0.6) !important;
}
</style>
