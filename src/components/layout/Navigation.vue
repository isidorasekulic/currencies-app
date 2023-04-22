<template>
  <v-navigation-drawer clipped permanent color="#F2F2F2" app>
    <v-list nav dense>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item
          v-for="item in navigationItems"
          :key="item.name"
          :ripple="false"
          color="#ff6600"
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Navigation extends Vue {
  selectedItem = 3;
  navigationItems = [
    { name: "Analytics", route: "/analytics", icon: "mdi-chart-line" },
    { name: "Offers", route: "/offers", icon: "mdi-ticket-percent-outline" },
    { name: "Loyality", route: "/loyality", icon: "mdi-account-star-outline" },
    { name: "Currencies", route: "/currencies", icon: "mdi-bitcoin" },
    { name: "Dispatch", route: "/dispatch", icon: "mdi-bike" },
    {
      name: "Configurations",
      route: "/configurations",
      icon: "mdi-cog-outline",
    },
  ];
}
</script>

<style lang="scss" scoped>
.v-list-item:hover {
  background-color: rgba(255, 102, 0, 0.07);
  * {
    color: #ff6600;
  }
}
</style>
