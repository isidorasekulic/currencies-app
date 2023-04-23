<template>
  <v-app-bar clipped-left :elevation="1" color="white" app>
    <v-avatar color="primary" width="32" size="small" class="mr-3">
      <span class="text-h5">A</span>
    </v-avatar>

    <div>
      <div class="c_subtitle_1">Brand name</div>
      <div class="c_body font-weight-bold">All stores</div>
    </div>

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
