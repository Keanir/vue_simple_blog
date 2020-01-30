<template>
  <v-app>
    <v-container>
      <!-- Меню для мобильных устройств -->
      <v-navigation-drawer app temporary v-model="drawer">
        <v-list>
          <v-list-item v-for="link of links" :key="link.title" :to="link.url">
            <v-list-item-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="link.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="isUserLoggedIn" @click="logout">
            <v-list-item-action>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="'Logout'"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <!-- Тулбар с меню -->
      <v-toolbar dark color="primary">
        <v-app-bar-nav-icon
          @click="drawer = !drawer"
          class="hidden-md-and-up"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>
          <router-link to="/" tag="span" class="pointer"
            >Simple Blog on Vue.js</router-link
          >
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn v-for="link in links" :key="link.title" :to="link.url" text>
            <v-icon left>{{ link.icon }}</v-icon>
            {{ link.title }}
          </v-btn>
          <v-btn @click.prevent="logout" text v-if="isUserLoggedIn">
            <v-icon left>mdi-logout</v-icon>
            Logout
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-container>

    <v-content>
      <router-view></router-view>
    </v-content>

    <template v-if="error">
      <v-snackbar
        :timeout="5000"
        :multi-line="true"
        color="error"
        @input="closeError"
        :value="true"
      >
        {{ error }}
        <v-btn text dark @click.native="closeError">Close</v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: function() {
    return {
      drawer: false
    };
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    links() {
      if (this.isUserLoggedIn) {
        return [
          { title: "Home Page", icon: "mdi-home", url: "/" },
          { title: "New post", icon: "mdi-book-plus", url: "/new" },
          { title: "My Posts", icon: "mdi-playlist-edit", url: "/posts" }
        ];
      }

      return [
        { title: "Login", icon: "mdi-account-lock-outline", url: "/login" },
        {
          title: "Registration",
          icon: "mdi-account-plus-outline",
          url: "/registration"
        }
      ];
    }
  },
  methods: {
    closeError() {
      this.$store.dispatch("clearError");
    },
    logout() {
      this.$store.dispatch("logoutUser");
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
