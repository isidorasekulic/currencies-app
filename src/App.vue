<template>
  <v-app id="app">
    <router-view />
  </v-app>
</template>

<style lang="scss">
#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
