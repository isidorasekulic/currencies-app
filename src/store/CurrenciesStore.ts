import { Currency } from "@/types/Currency";
const currenciesJson = sessionStorage.getItem("currencies");

type CurrenciesState = {
  currencies: Currency[];
};

const state: CurrenciesState = {
  currencies: currenciesJson != null ? JSON.parse(currenciesJson) : [],
};

const CurrenciesStore = {
  state: state,
  mutations: {
    addCurrency: (state: CurrenciesState, currency: Currency) => {
      state.currencies.push(currency);
      sessionStorage.setItem("currencies", JSON.stringify(state.currencies));
    },
    removeCurrency: (state: CurrenciesState, index: number) => {
      state.currencies.splice(index, 1);
      sessionStorage.setItem("currencies", JSON.stringify(state.currencies));
    },
    editCurrency: (state: CurrenciesState, currency: Currency) => {
      const index = state.currencies.findIndex(
        (c: Currency) => c.id === currency.id
      );
      state.currencies.splice(index, 1, currency);
    },
  },
  actions: {},
  getters: {
    currencies: (state: CurrenciesState) => state.currencies,
    nextId: (state: CurrenciesState) =>
      state.currencies.length
        ? state.currencies.sort((a: Currency, b: Currency) => a.id - b.id)[
            state.currencies.length - 1
          ].id + 1
        : 1,
    getCurrencyById: (state: CurrenciesState) => (id: number) =>
      state.currencies.find((currency: Currency) => currency.id === id),
  },
};

export default CurrenciesStore;
