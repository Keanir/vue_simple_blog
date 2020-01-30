import fb from "firebase";

export default {
  state: {
    posts: []
  },
  mutations: {
    createPost(state, payload) {
      state.posts.push(payload);
    },
    setPosts(state, payload) {
      state.posts = payload;
    }
  },
  actions: {
    async createPost({ commit }, payload) {
      commit("clearError");
      commit("setLoading", true);
      try {
        const newPost = await fb
          .firestore()
          .collection("posts")
          .add({
            createdOn: new Date(),
            title: payload.title,
            content: payload.content,
            userId: fb.auth().currentUser.uid,
            userName: fb.auth().currentUser.displayName,
            comments: 0,
            likes: 0
          });
        commit("setLoading", false);
        commit("createPost", newPost);
      } catch (error) {
        commit("setError", error.message);
        commit("setLoading", false);
        throw error;
      }
    },
    async fetchPosts({ commit }) {
      commit("clearError");
      commit("setLoading", true);
      try {
        fb.firestore()
          .collection("posts")
          .orderBy("createdOn", "desc")
          .onSnapshot(q => {
            let postsArr = [];
            q.forEach(doc => {
              let post = doc.data();
              post.id = doc.id;
              postsArr.push(post);
            });
            commit("setLoading", false);
            commit("setPosts", postsArr);
          });
      } catch (error) {
        commit("setError", error.message);
        commit("setLoading", false);
        throw error;
      }
    },
    async editPost({ commit }, payload) {
      commit("clearError");
      commit("setLoading", true);
      try {
        await fb
          .firestore()
          .collection("posts")
          .doc(payload.id)
          .update({
            title: payload.title,
            content: payload.content
          });
        commit("setLoading", false);
      } catch (error) {
        commit("setError", error.message);
        commit("setLoading", false);
        throw error;
      }
    },
    async deletePost({ commit }, payload) {
      commit("clearError");
      commit("setLoading", true);
      try {
        await fb
          .firestore()
          .collection("posts")
          .doc(payload.id)
          .delete();
      } catch (error) {
        commit("setError", error.message);
        commit("setLoading", false);
        throw error;
      }
    }
  },
  getters: {
    posts(state) {
      return state.posts;
    },
    postsById(state) {
      return id => {
        return state.posts.find(post => post.id === id);
      };
    },
    myPosts(state) {
      return state.posts.filter(post => {
        return post.userId === fb.auth().currentUser.uid;
      });
    }
  }
};
