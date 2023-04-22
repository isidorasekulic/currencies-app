<template>
  <div class="add_currency">
    <div class="d-flex justify-space-between mb-3 pa-3 pb-0">
      <div>
        <v-btn plain icon class="mr-2" :to="{ name: 'currencies' }">
          <v-icon> mdi-close </v-icon></v-btn
        >
        <span>Add Currencies</span>
      </div>
      <div>
        <v-btn
          right
          height="34"
          :ripple="false"
          depressed
          outlined
          plain
          class="text-capitalize mr-2"
          :to="{ name: 'currencies' }"
          >Cancel</v-btn
        >
        <v-btn
          right
          color="#FF6600"
          height="34"
          :ripple="false"
          depressed
          class="white--text text-capitalize"
        >
          Add</v-btn
        >
      </div>
    </div>
    <v-divider />
    <div class="ma-6">
      <p class="mb-1">Currency name</p>
      <v-text-field
        outlined
        solo
        flat
        dense
        placeholder="Add name"
      ></v-text-field>

      <p class="mb-1">Currency code</p>
      <v-text-field
        outlined
        solo
        flat
        dense
        placeholder="e.g. USD"
      ></v-text-field>

      <p class="mb-1">Currency symbol</p>
      <v-text-field
        outlined
        solo
        flat
        dense
        placeholder="Add symbol"
      ></v-text-field>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AddCurrency extends Vue {}
</script>

<style lang="scss" scoped>
.add_currency {
  min-width: 440px;
}
</style>
