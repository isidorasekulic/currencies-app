import Vue from "vue";
import { mount, Wrapper } from "@vue/test-utils";
import AddCurrency from "@/components/AddCurrency.vue";
import { RouterLinkStub } from "@vue/test-utils";
import { Currency } from "@/types/Currency";
import Vuetify from "vuetify";
import Vuelidate from "vuelidate";
Vue.use(Vuetify);
Vue.use(Vuelidate);

describe("AddCurrency.vue", () => {
  let wrapper: Wrapper<AddCurrency>;
  const currencies: Currency[] = [];
  const currency: Currency = {
    id: 1,
    name: "US Dollar",
    code: "USD",
    symbol: "$",
  };
  const emptyCurrency: Currency = {
    id: 0,
    name: "",
    code: "",
    symbol: "",
  };

  const invalidCurrency: Currency = {
    id: 1,
    name: "",
    code: "",
    symbol: "$",
  };

  const mockStore = {
    getters: {
      currencies: currencies,
      nextId: 1,
      getCurrencyById: () => ({}),
    },
    commit: jest.fn(),
  };

  const mockRoute = {
    name: "addCurrency",
    params: { id: "" },
  };

  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    const vuetify = new Vuetify();
    wrapper = mount(AddCurrency, {
      vuetify,
      mocks: {
        $store: mockStore,
        $route: mockRoute,
        $router: mockRouter,
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("adds a new currency", () => {
    wrapper.setData({ currency });
    wrapper.find("button.white--text").trigger("click");
    expect(wrapper.vm.$store.commit).toHaveBeenCalledWith(
      "addCurrency",
      currency
    );
    expect(wrapper.vm.$data.currency).toEqual(emptyCurrency);
  });

  it("does not add a new currency when validation fails", () => {
    wrapper.find(".add_currency button.white--text").trigger("click");
    expect(wrapper.vm.$store.commit).toHaveBeenCalledTimes(0);
    expect(wrapper.vm.$data.currency).toEqual({
      id: 0,
      name: "",
      code: "",
      symbol: "",
    });
  });

  it("does not add a new currency when code is duplicated", async () => {
    mockStore.getters.currencies.push(currency);
    wrapper.setData({ currency });
    wrapper.find("button.white--text").trigger("click");
    expect(wrapper.vm.$store.commit).toHaveBeenCalledTimes(0);
    expect(wrapper.vm.$data.duplicateCode).toBe(true);
  });

  it("edits an existing currency", async () => {
    wrapper.setData({ currency });
    wrapper.vm.$route.name = "editCurrency";
    await wrapper.vm.$nextTick();
    wrapper.find("button.white--text").trigger("click");
    expect(wrapper.vm.$store.commit).toHaveBeenCalledWith(
      "editCurrency",
      currency
    );
    expect(wrapper.vm.$data.currency).toEqual(emptyCurrency);
  });

  it("does not edit a currency when validation fails", async () => {
    wrapper.setData({ currency: invalidCurrency });
    wrapper.vm.$route.name = "editCurrency";
    await wrapper.vm.$nextTick();
    wrapper.find("button.white--text").trigger("click");
    expect(wrapper.vm.$store.commit).toHaveBeenCalledTimes(0);
    expect(wrapper.vm.$data.currency).toEqual(invalidCurrency);
  });
});
