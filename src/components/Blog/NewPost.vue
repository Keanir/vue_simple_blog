<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col xs="12" sm="6" offset-sm3>
        <h2 class="text--secondary mb-3">Create new ad</h2>
        <v-form v-model="valid" ref="form" validation class="mb-3">
          <v-text-field
            name="title"
            label="Ad title"
            type="text"
            v-model.trim="post.title"
            required
            :rules="[v => !!v || 'Title is required']"
          ></v-text-field>
          <v-textarea
            name="content"
            label="Your text"
            type="text"
            v-model.trim="post.content"
            multi-line
            :rules="[v => !!v || 'Text is required']"
          ></v-textarea>
        </v-form>
        <v-row>
          <v-col xs="12">
            <v-spacer></v-spacer>
            <v-btn
              :loading="loading"
              :disabled="!valid || loading"
              class="success"
              @click="createPost"
            >
              Create ad
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      post: {
        title: "",
        content: ""
      },
      valid: false
    };
  },
  computed: {
    ...mapState(["loading"])
  },
  methods: {
    createPost() {
      if (this.$refs.form.validate()) {
        const post = {
          title: this.post.title,
          content: this.post.content
        };

        this.$store.dispatch("createPost", post);
        this.$router.push("/posts");
      }
    }
  }
};
</script>
