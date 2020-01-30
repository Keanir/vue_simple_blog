import fb from "firebase";

export default {
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    async registerUser({ commit }, payload) {
      commit("clearError");
      commit("setLoading", true);
      try {
        const user = await fb
          .auth()
          .createUserWithEmailAndPassword(payload.email, payload.password);
        await user.user.updateProfile({
          displayName: payload.username
        });
        commit("setUser", user.user);
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        throw error;
      }
    },
    async loginUser({ commit }, { email, password }) {
      commit("clearError");
      commit("setLoading", true);
      try {
        const user = await fb
          .auth()
          .signInWithEmailAndPassword(email, password);
        await commit("setUser", user.user);
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        throw error;
      }
    },
    autoLoginUser({ commit }, payload) {
      commit("setUser", payload.user);
    },
    logoutUser({ commit }) {
      fb.auth().signOut();
      commit("setUser", null);
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    isUserLoggedIn(state) {
      return state.user !== null;
    }
  }
};
