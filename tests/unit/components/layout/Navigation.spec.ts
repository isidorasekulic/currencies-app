import { mount, Wrapper } from "@vue/test-utils";
import Navigation from "@/components/layout/Navigation.vue";
import Vue from "vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";

Vue.use(Vuetify);
Vue.use(VueRouter);

describe("Navigation", () => {
  let wrapper: Wrapper<Navigation>;

  beforeEach(() => {
    const vuetify = new Vuetify();
    const router = new VueRouter();
    wrapper = mount(Navigation, {
      vuetify,
      router,
    });
  });

  it("should have the correct number of navigation items", () => {
    const items = wrapper.findAll(".v-list-item");
    expect(items.length).toBe(6);
  });

  it("should update the selected item when a navigation item is clicked", async () => {
    const items = wrapper.findAll(".v-list-item");
    const thirdItem = items.at(2);

    await thirdItem.trigger("click");
    expect(wrapper.vm.$data.selectedItem).toBe(2);

    const fifthItem = items.at(4);
    await fifthItem.trigger("click");
    expect(wrapper.vm.$data.selectedItem).toBe(4);
  });
});
