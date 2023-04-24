<template>
  <div class="add_currency">
    <div class="d-flex justify-space-between mb-3 pa-3 pb-0">
      <div>
        <v-btn plain icon class="mr-2" :to="{ name: 'currencies' }">
          <v-icon> mdi-close </v-icon></v-btn
        >
        <span v-if="isEditActive" class="c_title_3">Edit Currencies</span>
        <span v-else class="c_title_3">Add Currencies</span>
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
          color="primary"
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
          color="primary"
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
      <p class="mb-1 c_subtitle_2">Currency name</p>
      <v-text-field
        outlined
        solo
        flat
        dense
        placeholder="Add name"
        v-model="currency.name"
        :error-messages="getErrorMessage('name')"
      ></v-text-field>

      <p class="mb-1 c_subtitle_2">Currency code</p>
      <v-text-field
        outlined
        solo
        flat
        dense
        placeholder="e.g. USD"
        v-model="currency.code"
        :error-messages="getErrorMessage('code')"
      ></v-text-field>

      <p class="mb-1 c_subtitle_2">Currency symbol</p>
      <v-text-field
        outlined
        solo
        flat
        dense
        placeholder="Add symbol"
        v-model="currency.symbol"
        :error-messages="getErrorMessage('symbol')"
      ></v-text-field>
      <v-alert v-if="duplicateCode" color="error" dense type="error"
        >Currency with this code already exists</v-alert
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import { Validations } from "vuelidate-property-decorators";
import { Currency } from "@/types/Currency";
import cloneDeep from "lodash/cloneDeep";

@Component({ mixins: [validationMixin] })
export default class AddCurrency extends Vue {
  emptyCurrency: Currency = {
    id: 0,
    name: "",
    code: "",
    symbol: "",
  };

  currency: Currency = cloneDeep(this.emptyCurrency);
  duplicateCode = false;

  get isEditActive() {
    return this.$route.name === "editCurrency";
  }

  get selectedCurrency() {
    return parseInt(this.$route.params.id);
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
    if (this.$v.currency[fieldName]?.$error) {
      if (!this.$v.currency[fieldName]?.required) {
        return `Please enter a ${fieldName}`;
      }
      if (
        this.$v.currency[fieldName]?.minLength === false ||
        this.$v.currency[fieldName]?.maxLength === false
      ) {
        return `Please enter a valid ${fieldName}`;
      }
    }
    return [];
  }

  addCurrency() {
    this.$v.$touch();
    if (!this.$v.$invalid && this.isCodeValid()) {
      this.currency.id = this.$store.getters.nextId;
      this.$store.commit("addCurrency", this.currency);
      this.currency = cloneDeep(this.emptyCurrency);
      this.$v.$reset();
    }
  }

  isCodeValid() {
    const codeExists = this.$store.getters.currencies.find(
      (c: Currency) => c.code === this.currency.code
    );
    if (codeExists) {
      this.duplicateCode = true;
      setTimeout(() => (this.duplicateCode = false), 3000);
      return false;
    }
    return true;
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
    if (this.selectedCurrency) {
      this.currency = cloneDeep(
        this.$store.getters.getCurrencyById(this.selectedCurrency)
      );
    } else {
      this.currency = cloneDeep(this.emptyCurrency);
    }
  }

  mounted() {
    this.getCurrency();
  }
}
</script>

<style lang="sass" scoped>
.add_currency
	min-width: 440px
</style>
