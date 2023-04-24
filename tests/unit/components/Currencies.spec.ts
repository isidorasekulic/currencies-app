import Vue from "vue";
import { mount, Wrapper } from "@vue/test-utils";
import Currencies from "@/views/Currencies.vue";
import { RouterLinkStub } from "@vue/test-utils";
import Vuetify from "vuetify";
Vue.use(Vuetify);

describe("Currencies", () => {
  let wrapper: Wrapper<Currencies>;

  beforeEach(() => {
    const vuetify = new Vuetify();
    const mockStore = {
      getters: {
        currencies: [
          { id: 1, name: "US Dollar", code: "USD", symbol: "$" },
          { id: 2, name: "Euro", code: "EUR", symbol: "€" },
        ],
      },
      commit: jest.fn(),
    };

    const mockRouter = {
      push: jest.fn(),
    };

    const mockRoute = {
      name: "currencies",
      params: { id: "" },
    };

    wrapper = mount(Currencies, {
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

  it("displays the correct number of currencies", () => {
    expect(wrapper.findAll(".currencies__list__table_row")).toHaveLength(2);
  });

  it("filters the currencies correctly based on search term", async () => {
    wrapper.setData({ searchTerm: "USD" });
    await wrapper.vm.$nextTick();

    expect(wrapper.findAll(".currencies__list__table_row")).toHaveLength(1);
    expect(
      wrapper.find(".currencies__list__table_row td:first-child").text()
    ).toBe("US Dollar");
  });

  it('calls the removeCurrency method when the delete button is clicked', () => {
    const removeButton = wrapper.find('.currencies__list__table_row button')
    removeButton.trigger('click')

    expect(wrapper.vm.$store.commit).toHaveBeenCalledWith('removeCurrency', 0)
  });

});
