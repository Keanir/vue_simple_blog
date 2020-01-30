<template>
  <v-container>
    <v-row v-if="!loading" justify="center">
      <v-col xs="12" md="6">
        <v-card class="mb-3" v-for="(post, key) in posts" :key="key">
          <v-card-title>{{ post.title }}</v-card-title>
          <v-card-text class="text--primary">
            <span>By: {{ post.userName }}</span>
          </v-card-text>
          <v-card-actions>
            <v-btn color="success" :to="'/post/' + post.id">Read</v-btn>
            <v-spacer></v-spacer>
            <v-icon color="primary">mdi-thumb-up</v-icon>
            <span>{{ post.likes }}</span>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapState(["loading"]),
    ...mapGetters(["posts"])
  },
  created: function() {
    return this.$store.dispatch("fetchPosts");
  }
};
</script>
