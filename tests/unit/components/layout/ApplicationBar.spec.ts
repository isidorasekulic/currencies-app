import Vue from "vue";
import { mount, Wrapper } from "@vue/test-utils";
import ApplicationBar from "@/components/layout/ApplicationBar.vue";
import Vuetify from "vuetify";
Vue.use(Vuetify);

describe("ApplicationBar", () => {
  let wrapper: Wrapper<ApplicationBar>;

  beforeEach(() => {
    const vuetify = new Vuetify();
    wrapper = mount(ApplicationBar, {
      vuetify,
    });
  });

  it("renders the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("contains the avatar component", () => {
    expect(wrapper.find(".v-avatar").exists()).toBe(true);
  });

  it("contains the correct brand name", () => {
    const brandName = "Brand name";
    const brandNameElement = wrapper.find(".c_subtitle_1");
    expect(brandNameElement.text()).toBe(brandName);
  });

  it("contains the correct store name", () => {
    const storeName = "All stores";
    const storeNameElement = wrapper.find(".c_body");
    expect(storeNameElement.text()).toBe(storeName);
  });

  it("contains notification and user icons on the right side", () => {
    expect(wrapper.findAll(".v-btn").length).toBe(2);
  });
});
