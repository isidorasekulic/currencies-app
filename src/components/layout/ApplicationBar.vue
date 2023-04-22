<template>
  <v-app-bar clipped-left :elevation="1" color="white" app>
    <v-avatar color="#FF6600" width="32" size="small" class="mr-3">
      <span class="text-h5">A</span>
    </v-avatar>

    <v-app-bar-title>
      <div class="caption font-weight-medium text-uppercase">Brand name</div>
      <div class="body-2 font-weight-bold">All stores</div>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-bell-outline</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-account-outline</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ApplicationBar extends Vue {}
</script>
