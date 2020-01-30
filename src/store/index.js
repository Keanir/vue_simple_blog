import Vue from "vue";
import Vuex from "vuex";
import user from "./user";
import posts from "./posts";
import utils from "./utils";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    posts,
    utils
  }
});
