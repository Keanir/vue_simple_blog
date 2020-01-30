<template>
  <v-container>
    <v-row justify="center">
      <v-col xs="12">
        <v-card v-if="!loading">
          <!-- <v-img :src="ad.imageSrc" height="300px"></v-img> -->
          <v-card-text>
            <h2 class="text--primary">{{ post.title }}</h2>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <p>{{ post.content }}</p>
          </v-card-text>

          <v-card-actions>
            <v-btn icon color="primary" @click="likePost(post.id, post.likes)">
              <v-icon>mdi-thumb-up</v-icon>
              <span>{{ post.likes }}</span>
            </v-btn>
            <v-spacer></v-spacer>
            <EditPost :post="post" v-if="isAuthor"></EditPost>
          </v-card-actions>
        </v-card>

        <v-row align="center" justify="center" v-else>
          <v-col cols="12">
            <v-progress-circular
              indeterminate
              :size="100"
              :width="4"
              color="purple"
            ></v-progress-circular>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EditPost from "./EditPost";
import fb from "firebase";

export default {
  props: ["id"],
  computed: {
    post() {
      const id = this.id;
      return this.$store.getters.postsById(id);
    },
    loading() {
      return this.$store.getters.loading;
    },
    isAuthor() {
      return this.post.userId === fb.auth().currentUser.uid;
    }
  },
  components: {
    EditPost
  },
  methods: {
    likePost(postId, postLikes) {
      let docId = `${fb.auth().currentUser.uid}_${postId}`;
      fb.firestore()
        .collection("likes")
        .doc(docId)
        .get()
        .then(doc => {
          if (doc.exists) {
            return;
          }
          fb.firestore()
            .collection("likes")
            .doc(docId)
            .set({
              postId: postId,
              userId: fb.auth().currentUser.uid
            })
            .then(() => {
              // update post likes
              fb.firestore()
                .collection("posts")
                .doc(postId)
                .update({
                  likes: postLikes + 1
                });
            });
        })
        .catch(() => {});
    }
  }
};
</script>
