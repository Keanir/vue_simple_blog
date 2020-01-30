<template>
  <v-dialog width="400px" v-model="modal">
    <template v-slot:activator="{ on }">
      <v-btn class="warning" text v-on="on">Edit</v-btn>
    </template>
    <v-card>
      <v-container>
        <v-row>
          <v-col xs="12">
            <v-card-title>
              <h2 class="text--primary">Edit post</h2>
            </v-card-title>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col xs="12">
            <v-card-text>
              <v-text-field
                name="title"
                label="Title"
                type="text"
                v-model.trim="editedTitle"
              ></v-text-field>
              <v-textarea
                name="content"
                label="Content"
                type="text"
                multi-line
                v-model.trim="editedContent"
              ></v-textarea>
            </v-card-text>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col xs="12">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="error" @click="onDelete">Delete</v-btn>
              <v-btn class="warning" @click="onCancel">Cancel</v-btn>
              <v-btn class="success" @click="onSave">Save</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["post"],
  data() {
    return {
      modal: false,
      editedTitle: this.post.title,
      editedContent: this.post.content
    };
  },
  methods: {
    onCancel() {
      this.editedTitle = this.post.title;
      this.editedContent = this.post.content;
      this.modal = false;
    },
    onSave() {
      if (this.editedTitle !== "" && this.editedContent !== "") {
        this.$store.dispatch("editPost", {
          title: this.editedTitle,
          content: this.editedContent,
          id: this.post.id
        });

        this.modal = false;
      }
    },
    onDelete() {
      this.$store.dispatch("deletePost", this.post);
      this.$router.push("/");
    }
  }
};
</script>
