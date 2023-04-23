<template>
  <div class="currencies d-flex">
    <div class="currencies__list ma-8">
      <div class="d-flex justify-space-between">
        <span class="c_title_1">Currencies</span>
        <v-btn
          right
          color="primary"
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
          class="currencies__list__search"
          v-model="searchTerm"
          clearable
        ></v-text-field>
      </div>
      <v-data-table
        :headers="headers"
        :items="listedCurrencies"
        item-key="id"
        :hide-default-footer="listedCurrencies.length < 11"
        no-data-text="There are no currencies added"
        dense
      >
        <template v-slot:item="{ item, index }">
          <tr class="currencies__list__table_row" :key="index">
            <td @click="editCurrency(item.id)">{{ item.name }}</td>
            <td @click="editCurrency(item.id)">{{ item.code }}</td>
            <td @click="editCurrency(item.id)">{{ item.symbol }}</td>
            <td>
              <v-btn icon @click="removeCurrency(item, index)">
                <v-icon>mdi-trash-can-outline</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>
    <v-divider vertical></v-divider>
    <div v-if="isAddActive || isEditActive"><AddCurrency /></div>
  </div>
</template>

<script lang="ts">
import AddCurrency from "@/components/AddCurrency.vue";
import { Component, Vue } from "vue-property-decorator";
import { Currency } from "@/types/Currency";

@Component({ components: { AddCurrency } })
export default class Currencies extends Vue {
  searchTerm = "";
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

  get isAddActive() {
    return this.$route.name === "addCurrency";
  }

  get isEditActive() {
    return this.$route.name === "editCurrency";
  }

  get currencies() {
    return this.$store.getters.currencies;
  }

  get listedCurrencies() {
    if (this.searchTerm) {
      return this.currencies.filter(
        (currency: Currency) =>
          currency.name.includes(this.searchTerm) ||
          currency.code.includes(this.searchTerm) ||
          currency.symbol.includes(this.searchTerm)
      );
    }
    return this.currencies;
  }

  removeCurrency(item: Currency, index: number) {
    if (this.isEditActive && parseInt(this.$route.params.id) === item.id) {
      this.$router.push({ name: "currencies" });
    }
    this.$store.commit("removeCurrency", index);
  }

  editCurrency(id: string) {
    if (this.$route.params.id !== id) {
      this.$router.push({ name: "editCurrency", params: { id: id } });
    }
  }
}
</script>

<style lang="sass" scoped>
.currencies
  height: 100%
  &__list
    width: 100%
    &__search
      max-width: 300px
    &__table_row
        cursor: pointer
</style>
