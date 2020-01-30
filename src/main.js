import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import fb from "firebase";
import "firebase/firestore";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyA9HpfjJEOTQETSCM-iAX01icYWNvYiF74",
  authDomain: "vue-simple-blog-f873e.firebaseapp.com",
  databaseURL: "https://vue-simple-blog-f873e.firebaseio.com",
  projectId: "vue-simple-blog-f873e",
  storageBucket: "vue-simple-blog-f873e.appspot.com",
  messagingSenderId: "18053521216",
  appId: "1:18053521216:web:7bc8efaac0f9305943a4a5"
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
