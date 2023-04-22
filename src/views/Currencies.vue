<template>
  <div class="currencies d-flex">
    <div class="currencies__list ma-8">
      <div class="d-flex justify-space-between">
        <span>Currencies</span> {{ isAddActive }}
        <v-btn
          right
          color="#FF6600"
          height="34"
          :ripple="false"
          depressed
          class="white--text text-capitalize"
          :to="{ name: 'addCurrency' }"
        >
          <v-icon left> mdi-plus </v-icon>Add currency</v-btn
        >
      </div>
      <div class="d-flex mt-6">
        <v-text-field
          outlined
          solo
          flat
          dense
          label="Search"
          prepend-inner-icon="mdi-magnify"
          class="currencies__search"
        ></v-text-field>
      </div>
      <v-data-table
        :headers="headers"
        :items="currencies"
        item-key="name"
        :hide-default-footer="currencies.length < 11"
        no-data-text="There are no currencies added"
        @click:row="selectRow"
      >
        <template v-slot:[`item.delete`]>
          <v-btn icon>
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </div>
    <v-divider vertical></v-divider>
    <div v-if="isAddActive"><AddCurrency /></div>
  </div>
</template>

<script lang="ts">
import AddCurrency from "@/components/AddCurrency.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({ components: { AddCurrency } })
export default class Currencies extends Vue {
  headers = [
    {
      text: "Currency name",
      align: "start",
      value: "name",
      sortable: false,
      class: "text-uppercase",
      width: "50%",
    },
    {
      text: "Currency code",
      value: "code",
      align: "start",
      sortable: false,
      class: "text-uppercase",
      width: "20%",
    },
    {
      text: "Currency symbol",
      value: "symbol",
      align: "start",
      sortable: false,
      class: "text-uppercase",
      width: "20%",
    },
    {
      value: "delete",
      align: "start",
      sortable: false,
      width: "10%",
    },
  ];
  currencies = [
    { name: "test", code: "$", symbol: "$" },
    { name: "test1", code: "$", symbol: "$" },
  ];

  get isAddActive() {
    return this.$route.name === "addCurrency";
  }
}
</script>

<style lang="scss" scoped>
tbody {
  tr:hover {
    cursor: pointer;
  }
}
.currencies {
  height: 100%;
}
.currencies__list {
  width: 100%;
}
.currencies__search {
  max-width: 300px;
}
</style>
