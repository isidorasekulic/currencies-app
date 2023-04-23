<template>
  <div class="add_currency">
    <div class="d-flex justify-space-between mb-3 pa-3 pb-0">
      <div>
        <v-btn plain icon class="mr-2" :to="{ name: 'currencies' }">
          <v-icon> mdi-close </v-icon></v-btn
        >
        <span v-if="isEditActive">Edit Currencies</span>
        <span v-else>Add Currencies</span>
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
          @click="editCurrency"
          v-if="isEditActive"
        >
          Save</v-btn
        >
        <v-btn
          right
          color="#FF6600"
          height="34"
          :ripple="false"
          depressed
          class="white--text text-capitalize"
          @click="addCurrency"
          v-else
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
        v-model="currency.name"
        :error-messages="getErrorMessage('name')"
      ></v-text-field>

      <p class="mb-1">Currency code</p>
      <v-text-field
        outlined
        solo
        flat
        dense
        placeholder="e.g. USD"
        v-model="currency.code"
        :error-messages="getErrorMessage('code')"
      ></v-text-field>

      <p class="mb-1">Currency symbol</p>
      <v-text-field
        outlined
        solo
        flat
        dense
        placeholder="Add symbol"
        v-model="currency.symbol"
        :error-messages="getErrorMessage('symbol')"
      ></v-text-field>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import { Validations } from "vuelidate-property-decorators";
import { Currency } from "@/types/Currency";

@Component({ mixins: [validationMixin] })
export default class AddCurrency extends Vue {
  cloneDeep = require("lodash.clonedeep");

  emptyCurrency: Currency = {
    id: 0,
    name: "",
    code: "",
    symbol: "",
  };

  currency: Currency = this.cloneDeep(this.emptyCurrency);

  get isEditActive() {
    return this.$route.name === "editCurrency";
  }

  get selectedCurrency() {
    return this.$route.params.id;
  }

  @Validations()
  validations = {
    currency: {
      name: { required },
      code: { required, minLength: minLength(3), maxLength: maxLength(3) },
      symbol: { required },
    },
  };

  getErrorMessage(fieldName: string) {
    if (!this.$v.currency[fieldName]?.required) {
      return `Please enter a ${fieldName}`;
    }
    if (
      this.$v.currency[fieldName]?.minLength === false ||
      this.$v.currency[fieldName]?.maxLength === false
    ) {
      return `Please enter a valid ${fieldName}`;
    }
    return [];
  }

  addCurrency() {
    this.$v.$touch();
    if (!this.$v.$invalid) {
      this.currency.id = this.$store.getters.nextId;
      this.$store.commit("addCurrency", this.currency);
      this.currency = this.cloneDeep(this.emptyCurrency);
      this.$v.$reset();
    }
  }

  editCurrency() {
    this.$v.$touch();
    if (!this.$v.$invalid) {
      this.$store.commit("editCurrency", this.currency);
      this.currency = this.emptyCurrency;
      this.$v.$reset();
      this.$router.push({ name: "currencies" });
    }
  }

  @Watch("selectedCurrency")
  onCurrencyChange() {
    this.getCurrency();
  }

  getCurrency() {
    if (this.$route.params.id) {
      this.currency = this.cloneDeep(
        this.$store.getters.getCurrencyById(this.$route.params.id)
      );
    } else {
      this.currency = this.cloneDeep(this.emptyCurrency);
    }
  }

  mounted() {
    this.getCurrency();
  }
}
</script>

<style lang="scss" scoped>
.add_currency {
  min-width: 440px;
}
</style>
