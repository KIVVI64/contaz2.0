import Vue from "vue";
import App from "./App.vue";
import firebase from "firebase";
import VueAnalytics from "vue-analytics";
import "./registerServiceWorker";
import router from "./router";
import vuetify from "./plugins/vuetify";

// Configuration VueAnalytics
Vue.use(VueAnalytics, {
  id: "UA-76102762-9",
  router
});

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyBXnk9BiOd8aGBflXuDUJpMPHJogAHsrns",
  authDomain: "contaz-pl.firebaseapp.com",
  databaseURL: "https://contaz-pl.firebaseio.com",
  projectId: "contaz-pl",
  storageBucket: "contaz-pl.appspot.com",
  messagingSenderId: "539165494457",
  appId: "1:539165494457:web:3591cd06378471fe26df68",
  measurementId: "G-RMH1D4G5YW"
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
