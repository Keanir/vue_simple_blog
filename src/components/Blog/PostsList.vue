<template>
  <v-container>
    <v-row v-if="!loading && myPosts.length !== 0" justify="center">
      <v-col xs="12" sm="6" offset-sm3>
        <h2 class="text--secondary text-center mb-3">My posts</h2>

        <v-card class="mb-3" v-for="post in myPosts" :key="post.id">
          <v-row>
            <!-- <v-col xs="4">
              <v-img :src="ad.imageSrc" height="160px"></v-img>
            </v-col> -->
            <v-col xs="8">
              <v-card-text>
                <h2 class="text--primary">{{ post.title }}</h2>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="info" :to="'/post/' + post.id">Open</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else-if="!loading && myPosts.length === 0">
      <v-col xs="12" class="text-xs-center">
        <h2 class="text--primary">You have no posts</h2>
      </v-col>
    </v-row>

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
  </v-container>
</template>

<script>
export default {
  computed: {
    myPosts() {
      return this.$store.getters.myPosts;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>
