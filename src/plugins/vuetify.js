import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#8bc34a",
        secondary: "#2196f3",
        accent: "#ff5722",
        error: "#f44336",
        warning: "#ff9800",
        info: "#ffeb3b",
        success: "#4caf50"
      }
    }
  }
});
