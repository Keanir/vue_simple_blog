import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import fb from "firebase";
import "firebase/firestore";

Vue.config.productionTip = false;
// Enter your Firebase Config below
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

fb.initializeApp(firebaseConfig);
fb.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch("autoLoginUser", user);
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
