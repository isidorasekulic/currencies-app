import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

const opts = {
  theme: {
    themes: {
      light: {
        primary: "#FF6600",
        error: "#FF3B30",
        navigation: "F2F2F2",
      },
    },
  },
};

export default new Vuetify(opts);
